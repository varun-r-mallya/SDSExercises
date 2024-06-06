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
                res.cookie('token', token, { httpOnly: false, path: '/' });
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
            res.status(500).send(JSON.stringify({ message: 'Server Error' }));
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
    const query2 = `
        SELECT * FROM CONVERTQ;
    `;
    const query3 = `
        SELECT BOOKLIST.BookName, TRANSACTIONS.*
        FROM TRANSACTIONS
        INNER JOIN BOOKLIST ON TRANSACTIONS.B_Id = BOOKLIST.B_Id
        WHERE CheckOutAccepted IS NULL;
    `;
    const query4 = `
        SELECT BOOKLIST.BookName, TRANSACTIONS.*
        FROM TRANSACTIONS
        INNER JOIN BOOKLIST ON TRANSACTIONS.B_Id = BOOKLIST.B_Id
        WHERE CheckInAccepted = 0 AND CheckOutAccepted = 1;
    `;
    database.querySQL(query)
        .then((result) => {
            const booklist = result[0].booklist.split(",");
            const NumberofCopies = result[0].NumberofCopies;
            const NumberofCopiesAvailable = result[0].NumberofCopiesAvailable;
            const NumberofCopiesBorrowed = result[0].NumberofCopiesBorrowed;
            database.querySQL(query2)
                .then((result) => {
                    const convertq = result;
                    database.querySQL(query3)
                        .then((result) => {
                            const checkout = result;
                            database.querySQL(query4)
                            .then((result) => {
                                const checkin = result;
                                const data = {
                                    booklist,
                                    NumberofCopies,
                                    NumberofCopiesAvailable,
                                    NumberofCopiesBorrowed,
                                    convertq,
                                    checkout,
                                    checkin
                                };
                                res.render("./dashboards/admin.ejs", data);
                                return;
                            }) 
                        })
                        .catch((error) => {
                            res.render("./dashboards/admin.ejs", { booklist: [], convertq: [], NumberofCopies: 0, NumberofCopiesAvailable: 0, NumberofCopiesBorrowed: 0, checkout: [], checkin: []});
                            return;
                        });
        
                    })
            })
        .catch((error) => {
            if(error.message.includes("booklist"))
                res.render("./dashboards/admin.ejs", { booklist: [], convertq: [], NumberofCopies: 0, NumberofCopiesAvailable: 0, NumberofCopiesBorrowed: 0, checkout: [], checkin: []});
            else
            {
                console.error('Error getting booklist:', error);
                res.status(500).render('./error/servererror.ejs');
            }
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
            res.status(500).send(JSON.stringify({ message: 'Book not added' }));
            return;
        });
}

const View = (req, res) => {
    const title = req.query.search;
    const query = `SELECT * FROM BOOKLIST WHERE BookName = '${title}'`;
    const query2 = `SELECT * FROM TRANSACTIONS WHERE OverDueFine != 0 AND B_Id = (SELECT B_Id FROM BOOKLIST WHERE BookName = '${title}')`
    database.querySQL(query)
        .then((result) => {
            if (result.length === 0) {
                res.render('./search/booknotfound.ejs', {name: title});
                return;
            }
            const book = result[0];
            database.querySQL(query2)
            .then((result) => {
                const Fines = result;
                res.render('./search/admin.ejs', { book, Fines });
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

const ManageAdmins = (req, res) => {
    const acceptance = req.body.accepted;
    const username = req.body.username;
    if(acceptance == true) {
        const query = `
        INSERT INTO ADMINISTRATORS (AdminID, AdminPassword)
        VALUES ('${username}', (SELECT ClientPassword FROM CLIENT WHERE ClientID = '${username}'));
        INSERT INTO ADMINISTRATORSALT (AdminID, Salt)
        VALUES ('${username}', (SELECT Salt FROM CLIENTSALT WHERE ClientID = '${username}'));
        DELETE FROM CLIENTSALT WHERE ClientID = '${username}';
        DELETE FROM CONVERTQ WHERE ClientID = '${username}';
        DELETE FROM CLIENT WHERE ClientID = '${username}';
        `;
        database.querySQL(query)
            .then((result) => {
                res.send(JSON.stringify({ message: 'Admin Added' }));
                return;
            })
            .catch((error) => {
                console.error('Error adding admin:', error);
                res.send(JSON.stringify({ message: 'Admin not added' }));
                return;
            });
    }
    else if(acceptance == false) {
        const query = `DELETE FROM CONVERTQ WHERE ClientID = '${username}';`;
        database.querySQL(query)
            .then(() => {
                res.send(JSON.stringify({ message: 'Admin rejected' }));
                return;
            })
            .catch((error) => {
                console.error('Error rejecting admin:', error);
                res.send(JSON.stringify({ message: 'Admin not rejected' }));
                return;
            });
    }
}

const AcceptCheckOut = (req, res) => {
    const { T_Id, accepted } = req.body;
    if(accepted == false) {
        const query = `UPDATE TRANSACTIONS SET DateBorrowed = CURDATE(), CheckOutAccepted = 0 WHERE T_Id = ${T_Id};`;
        database.querySQL(query)
            .then(() => {
                res.send(JSON.stringify({ message: 'Book checkout rejected' }));
                return;
            })
            .catch((error) => {
                console.error('Error rejecting book checkout:', error);
                res.send(JSON.stringify({ message: 'Book checkout not rejected' }));
                return;
            });
    }
    else if(accepted == true) {
    const query = `
        UPDATE TRANSACTIONS
        SET DateBorrowed = CURDATE(), CheckOutAccepted = 1 
        WHERE T_Id = ${T_Id};
        UPDATE BOOKLIST
        SET NumberofCopiesBorrowed = NumberofCopiesBorrowed + 1,
        NumberofCopiesAvailable = NumberofCopiesAvailable - 1
        WHERE B_Id = (SELECT B_Id FROM TRANSACTIONS WHERE T_Id = ${T_Id});

    `;
    database.querySQL(query)
        .then(() => {
            res.send(JSON.stringify({ message: 'Book checked out' }));
            return;
        })
        .catch((error) => {
            console.error('Error checking out book:', error);
            res.send(JSON.stringify({ message: 'Book not checked out' }));
            return;
        });
    }
}

const AcceptCheckIn = (req, res) => {
    const { T_Id, accepted} = req.body;
    if(accepted == false) {
        const query = `UPDATE TRANSACTIONS SET DateReturned = CURDATE() WHERE T_Id = ${T_Id}';`;
        database.querySQL(query)
            .then(() => {
                res.send(JSON.stringify({ message: 'Book checkin rejected' }));
                return;
            })
            .catch((error) => {
                console.error('Error rejecting book checkin:', error);
                res.send(JSON.stringify({ message: 'Book checkin not rejected' }));
                return;
            });
    }
    else if(accepted == true) {
    const query = `
        UPDATE TRANSACTIONS
        SET DateReturned = CURDATE(), CheckInAccepted = 1
        WHERE T_Id = ${T_Id};
        UPDATE BOOKLIST
        SET NumberofCopiesAvailable = NumberofCopiesAvailable + 1,
        NumberofCopiesBorrowed = NumberofCopiesBorrowed - 1
        WHERE B_Id = (SELECT B_Id FROM TRANSACTIONS WHERE T_Id = ${T_Id});
        UPDATE TRANSACTIONS
            SET OverDueFine = ((DATEDIFF(CURDATE(), DateBorrowed) - 
                (SELECT NumberofDays FROM BOOKLIST WHERE B_Id = 
                    (SELECT B_Id FROM TRANSACTIONS WHERE T_Id = ${T_Id}))) *
                        ${process.env.FINEPERDAY})
            WHERE T_Id = ${T_Id} AND DATEDIFF(CURDATE(), DateBorrowed) >
                (SELECT NumberofDays FROM BOOKLIST WHERE B_Id = 
                    (SELECT B_Id FROM TRANSACTIONS WHERE T_Id = ${T_Id}));
        
    `;
    database.querySQL(query)
        .then(() => {
            res.send(JSON.stringify({ message: 'Book checked in' }));
            return;
        })
        .catch((error) => {
            console.error('Error checking in book:', error);
            res.send(JSON.stringify({ message: 'Book not checked in' }));
            return;
        });
    }

}

const HandleFine = (req, res) => {
    const {T_Id} = req.body;
    const query = `UPDATE TRANSACTIONS SET OverDueFine = 0 WHERE T_Id = ${T_Id}`;
    database.querySQL(query)
    .then(() => {
        res.send(JSON.stringify({ message: 'Fine paid' }));
        return;
    })
    .catch((error) => {
        console.error('Error paying fine:', error);
        res.send(JSON.stringify({ message: 'Fine not paid. Server Error' }));
    })
}

module.exports = {
    Admin,
    Authorize,
    Dashboard,
    AddBooks,
    View,
    Update,
    Delete,
    ManageAdmins,
    AcceptCheckOut,
    AcceptCheckIn,
    HandleFine
};