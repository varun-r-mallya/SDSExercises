const express = require('express');

const database = require('../database/database');
const passwords = require('../passwords/passwords.js');
const jsonwebtoken = require('../jsonwebtoken/jsonwebtoken.js');


const Admin = (req, res) => {
    res.render("./login/admin.ejs")
};
const Authorize = (req, res) => {
    const { username, password } = req.body;
    let query;
    const username_regex = /^[a-zA-Z0-9]+$/;
    const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!username.match(username_regex)) {
        res.send(JSON.stringify({ message: 'Invalid username' }));
        return;
    }
    if (!password.match(password_regex)) {
        res.send(JSON.stringify({ message: 'Password too short or invalid' }));
        return;
    }
    query = `SELECT ADMINISTRATORS.AdminPassword, ADMINISTRATORSALT.Salt
        FROM ADMINISTRATORS
        INNER JOIN ADMINISTRATORSALT ON ADMINISTRATORS.AdminID = ADMINISTRATORSALT.AdminID
        WHERE ADMINISTRATORS.AdminID = '${username}'`;
    database.querySQL(query)
        .then((result) => {
            if (result.length === 0) {
                res.send(JSON.stringify({ message: 'User does not exist' }));
                return;
            }
            const new_hashed_password = passwords.PasswordVerify(password, result[0].Salt);
            if (new_hashed_password === result[0].AdminPassword) {
                const token = jsonwebtoken.generateJWT(username, 'admin');
                res.cookie('token', token, { httpOnly: false, path: '/admin' });
                res.redirect('/admin/dashboard');
                return;
            }
            else {
                res.send(JSON.stringify({ message: 'Wrong Password' }));
                return;
            }
        })
        .catch((error) => {
            console.error('Error authenticating user:', error);
            res.send(JSON.stringify({ message: 'Login failed' }));
            return;
        });

}

const Dashboard = (req, res) => {
    const query = `
        SELECT 
            (SELECT GROUP_CONCAT(BookName) FROM BOOKLIST) AS booklist,
            (SELECT SUM(NumberofCopies) FROM BOOKLIST) AS NumberofCopies,
            (SELECT SUM(NumberofCopiesAvailable) FROM BOOKLIST) AS NumberofCopiesAvailable,
            (SELECT SUM(NumberofCopiesBorrowed) FROM BOOKLIST) AS NumberofCopiesBorrowed
        FROM BOOKLIST
    `;

    database.querySQL(query)
        .then((result) => {
            const booklist = result[0].booklist.split(",");
            const NumberofCopies = result[0].NumberofCopies;
            const NumberofCopiesAvailable = result[0].NumberofCopiesAvailable;
            const NumberofCopiesBorrowed = result[0].NumberofCopiesBorrowed;
            const data = {
                booklist,
                NumberofCopies,
                NumberofCopiesAvailable,
                NumberofCopiesBorrowed,
            };
            res.render("./dashboards/admin.ejs", data);
            return;
        })
        .catch((error) => {
            console.error('Error getting booklist:', error);
            res.render("./dashboards/admin.ejs", { booklist: [] });
            return;
        });
    }
const AddBooks = (req, res) => {
    const { title, author, genre, quantity, dueTime } = req.body;
    const query = `INSERT INTO BOOKLIST (BookName, Author, Genre, NumberofCopies, NumberofDays, NumberofCopiesAvailable) VALUES ('${title}', '${author}', '${genre}', ${quantity}, ${dueTime}, ${quantity})`;
    database.querySQL(query)
        .then(() => {
            res.send(JSON.stringify({ message: 'Book added' }));
            return;
        })
        .catch((error) => {
            console.error('Error adding book:', error);
            res.send(JSON.stringify({ message: 'Book not added' }));
            return;
        });
}

const View = (req, res) => {
    const title = req.query.search;
    const query = `SELECT * FROM BOOKLIST WHERE BookName = '${title}'`;
    database.querySQL(query)
        .then((result) => {
            if (result.length === 0) {
                res.render('./search/booknotfound.ejs', {name: title});
                return;
            }
            console.log(result[0]);
            res.render('./search/admin.ejs', { book: result[0] });
            return;
        })
        .catch((error) => {
            console.error('Error viewing book:', error);
            res.render('./error/servererror.ejs');
            return;
        });

}

const Update = (req, res) => {
    const { title, author, genre, quantity, dueTime, bookID } = req.body;
    const query = `UPDATE BOOKLIST SET Author = '${author}', Genre = '${genre}', NumberofCopies = ${quantity}, NumberofDays = ${dueTime}, NumberofCopiesAvailable = ${quantity}, BookName = '${title}' WHERE B_Id = '${bookID}'`;
    database.querySQL(query)
        .then(() => {
            res.send(JSON.stringify({ message: 'Book updated' }));
            return;
        })
        .catch((error) => {
            console.error('Error updating book:', error);
            res.send(JSON.stringify({ message: 'Book not updated' }));
            return;
        });
}

const Delete = (req, res) => {
    const query = `DELETE FROM BOOKLIST WHERE B_Id = '${req.body.bookID}' `;
    database.querySQL(query)
        .then(() => {
            res.send(JSON.stringify({ message: 'Book deleted' }));
            return;
        })
        .catch((error) => {
            console.error('Error deleting book:', error);
            res.send(JSON.stringify({ message: 'Book not deleted' }));
            return;
        });

}

module.exports = {
    Admin,
    Authorize,
    Dashboard,
    AddBooks,
    View,
    Update,
    Delete,


};