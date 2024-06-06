const express = require('express');

const database = require('../database/database');
const passwords = require('../passwords/passwords.js');
const jsonwebtoken = require('../jsonwebtoken/jsonwebtoken.js');

const Client = (req, res) => {
    res.render("./login/client.ejs")
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
    query = `SELECT CLIENT.ClientPassword, CLIENTSALT.Salt
        FROM CLIENT
        INNER JOIN CLIENTSALT ON CLIENT.ClientID = CLIENTSALT.ClientID
        WHERE CLIENT.ClientID = '${username}'`;
    database.querySQL(query)
        .then((result) => {
            if (result.length === 0) {
                res.send(JSON.stringify({ message: 'User does not exist' }));
                return;
            }
            const new_hashed_password = passwords.PasswordVerify(password, result[0].Salt);
            if (new_hashed_password === result[0].ClientPassword) {
                const token = jsonwebtoken.generateJWT(username, 'client');
                res.cookie('token', token, { httpOnly: false, path: '/' });         // made major change here on the cookies. may break private routes.
                res.redirect('/client/dashboard');
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
            (SELECT SUM(NumberofCopiesBorrowed) FROM BOOKLIST) AS NumberofCopiesBorrowed,
            (SELECT SUM(OverDueFine) FROM TRANSACTIONS WHERE ClientID = '${jsonwebtoken.verifyJWT(req.cookies.token).username}') AS OverDueFine
        FROM BOOKLIST 
        ;`;
    const query2 = `
        SELECT TRANSACTIONS.*, BOOKLIST.*
        FROM TRANSACTIONS
        INNER JOIN BOOKLIST ON TRANSACTIONS.B_Id = BOOKLIST.B_Id
        WHERE ClientID = '${jsonwebtoken.verifyJWT(req.cookies.token).username}';
    `;
    const query3 = `
        SELECT * FROM BOOKLIST
        ORDER BY RAND()
        LIMIT 20;
    `;
    database.querySQL(query)
        .then((result) => {
            const booklist = result[0].booklist.split(",");
            const NumberofCopies = result[0].NumberofCopies;
            const NumberofCopiesAvailable = result[0].NumberofCopiesAvailable;
            const NumberofCopiesBorrowed = result[0].NumberofCopiesBorrowed;
            const OverDueFine = result[0].OverDueFine;
            database.querySQL(query2)
                .then((result) => {
                    const transactions = result;
                    database.querySQL(query3)
                        .then((result) => {
                            const displayList = result;
                            const data = {
                                booklist,
                                NumberofCopies,
                                NumberofCopiesAvailable,
                                NumberofCopiesBorrowed,
                                transactions,
                                displayList,
                                OverDueFine
                            };
                            res.render("./dashboards/client.ejs", data);
                            return;
                        })
                        .catch((error) => {
                            console.error('Error getting booklist:', error);
                            res.render("./dashboards/client.ejs", { booklist: [], 
                                NumberofCopies: 0,
                                NumberofCopiesAvailable: 0,
                                NumberofCopiesBorrowed: 0,
                                transactions: [],
                                displayList: [],
                                OverDueFine: 0 
                            });
                            return;
                        });
                })
                .catch((error) => {
                    console.error('Error getting booklist:', error);
                    res.render("./dashboards/client.ejs", { booklist: [], 
                        NumberofCopies: 0,
                        NumberofCopiesAvailable: 0,
                        NumberofCopiesBorrowed: 0,
                        transactions: [],
                        displayList: [],
                        OverDueFine: 0
                    });
                    return;
                });
        })
        .catch((error) => {
            console.error('Error getting booklist:', error);
            res.render("./dashboards/client.ejs", { booklist: [], 
                NumberofCopies: 0,
                NumberofCopiesAvailable: 0,
                NumberofCopiesBorrowed: 0,
                transactions: [],
                displayList: [],
                OverDueFine: 0
            });
            return;
        });
};

const View = (req, res) => {
    const title = req.query.search;
    const query = `SELECT * FROM BOOKLIST WHERE BookName = '${title}'`;
    const query2 = `
        SELECT TRANSACTIONS.*, BOOKLIST.*
        FROM TRANSACTIONS
        INNER JOIN BOOKLIST ON TRANSACTIONS.B_Id = BOOKLIST.B_Id
        WHERE ClientID = '${jsonwebtoken.verifyJWT(req.cookies.token).username}' AND BookName = '${title}';
    `;
    database.querySQL(query)
        .then((result) => {
            if (result.length === 0) {
                res.render('./search/booknotfound.ejs', {name: title});
                return;
            }
            const book = result[0];
            database.querySQL(query2)
                .then((result) => {
                    const transactions = result;
                    res.render('./search/client.ejs', { book, transactions });
                    return;
                })
                .catch((error) => {
                    console.error('Error viewing book:', error);
                    res.render('./error/servererror.ejs');
                    return;
                });
        })
        .catch((error) => {
            console.error('Error viewing book:', error);
            res.render('./error/servererror.ejs');
            return;
        });
}

const AdminPreviledges = (req, res) => {
    const username = jsonwebtoken.verifyJWT(req.cookies.token).username;
    const query = `
        INSERT INTO CONVERTQ (ClientID) VALUES ('${username}');
    `;
    database.querySQL(query)
        .then(() => {
            res.send(JSON.stringify({ message: 'Request sent to become admin' }));
            return;
        })
        .catch((error) => {
            console.error('Error sending request:', error);
            res.send(JSON.stringify({ message: 'Request not sent to become admin' }));
            return;
        });
}

const CheckOut = (req, res) => {
    const bookID = req.body.bookID;
    const username = jsonwebtoken.verifyJWT(req.cookies.token).username;
    const T_Id = req.body.T_Id;
    const query = `
        SELECT NumberofCopiesAvailable
        FROM BOOKLIST
        WHERE B_Id = ${bookID};
    `;
    const query2 = `
        SELECT *
        FROM TRANSACTIONS
        WHERE ClientID = '${username}' AND B_Id = ${bookID} AND ((CheckOutAccepted = 1 AND CheckInAccepted IS NULL) OR (CheckOutAccepted = 1 AND CheckInAccepted = 0) OR (CheckOutAccepted IS NULL AND CheckInAccepted IS NULL));
    `;
    const query3 = `
        INSERT INTO TRANSACTIONS (ClientID, B_Id)
        VALUES ('${username}', ${bookID});
    `;
    database.querySQL(query)
        .then((result) => {
            if (result[0].NumberofCopiesAvailable === 0) {
                res.send(JSON.stringify({ message: 'No copies available' }));
                return;
            }
            database.querySQL(query2)
                .then((result) => {
                    if (result.length !== 0) {
                        res.send(JSON.stringify({ message: 'Book already borrowed' }));
                        return;
                    }
                    database.querySQL(query3)
                        .then(() => {
                            res.send(JSON.stringify({ message: 'Added for Admin Check Out Approval' }));
                            return;
                        })
                        .catch((error) => {
                            console.error('Error borrowing book:', error);
                            res.send(JSON.stringify({ message: 'Book not borrowed' }));
                            return;
                        });
                })
                .catch((error) => {
                    console.error('Error borrowing book:', error);
                    res.send(JSON.stringify({ message: 'Book not borrowed' }));
                    return;
                });
        })
        .catch((error) => {
            console.error('Error borrowing book:', error);
            res.send(JSON.stringify({ message: 'Book not borrowed' }));
            return;
        });
}

const CheckIn = (req, res) => {
    const { bookID } = req.body;
    const username = jsonwebtoken.verifyJWT(req.cookies.token).username;
    const query = `
        SELECT *
        FROM TRANSACTIONS
        WHERE ClientID = '${username}' AND B_Id = '${bookID}' AND CheckOutAccepted = 1 AND CheckInAccepted IS NULL OR CheckInAccepted != 1;
    `;
    const query2 = `
        UPDATE TRANSACTIONS
        SET CheckInAccepted = 0
        WHERE T_Id = (SELECT MAX(T_Id) FROM TRANSACTIONS WHERE ClientID = '${username}' AND B_Id = ${bookID});
    `;
    database.querySQL(query)
        .then((result) => {
            if (result.length === 0) {
                res.send(JSON.stringify({ message: 'Book not borrowed' }));
                return;
            }
            database.querySQL(query2)
                .then(() => {
                    res.send(JSON.stringify({ message: 'Added for Admin Check In Approval' }));
                    return;
                })
                .catch((error) => {
                    console.error('Error returning book:', error);
                    res.send(JSON.stringify({ message: 'Book not returned' }));
                    return;
                });
        })
        .catch((error) => {
            console.error('Error returning book:', error);
            res.send(JSON.stringify({ message: 'Book not returned' }));
            return;
        });

}

module.exports = {
    Client,
    Authorize,
    Dashboard,
    View,
    AdminPreviledges,
    CheckOut,
    CheckIn



};