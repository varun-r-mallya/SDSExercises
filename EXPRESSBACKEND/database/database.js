const mysql = require('mysql');
const dotenv = require('dotenv').config();
var db = null;

module.exports = {
    connectToSQL: connectToSQL,
    disconnectSQL: disconnectSQL,
    querySQL: querySQL,

    db: db,

};

function connectToSQL() {
    
    /* for connection pooling */

    // db = mysql.createPool({
    //     host: 'localhost',
    //     user: process.env.DBUSER,
    //     password: process.env.DBPASS,
    //     database: process.env.DBNAME
    // });

    db = mysql.createConnection({
        host: 'localhost',
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to SQL:', err);
            return;
        }
        console.log('Connected to SQL!');
    });

    return db;
}

function querySQL(query) {
    return new Promise((resolve, reject) =>
        db.query(query, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    );
}

function disconnectSQL() {
    db.end();
    console.log('Disconnected from SQL!');
}

