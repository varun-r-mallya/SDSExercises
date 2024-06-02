const express = require('express');
const database = require('../database/database');
const passwords = require('../passwords/passwords.js');
const jsonwebtoken = require('../jsonwebtoken/jsonwebtoken.js');

const Client = (req, res) => {
    res.render("./login/client.ejs")
};

const Authorize = (req, res) => {
    const { username, password } = req.body;
    let query, querysalt;
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
    query = `SELECT ClientPassword FROM CLIENT WHERE ClientId = '${username}'`;
    querysalt = `SELECT Salt FROM CLIENTSALT WHERE ClientId = '${username}'`;
    database.querySQL(query)
        .then((result) => {
            if (result.length === 0) {
                res.send(JSON.stringify({ message: 'User does not exist' }));
                return;
            }
            database.querySQL(querysalt)
                .then((result_salt) => {
                    const new_hashed_password = passwords.PasswordVerify(password, result_salt[0].Salt);
                    if (new_hashed_password === result[0].ClientPassword) {
                        const token = jsonwebtoken.generateJWT(username, 'client');
                        res.cookie('token', token, { httpOnly: true });
                        // res.send(JSON.stringify({ message: 'Login successful' }));
                        res.redirect('/client/dashboard');
                        return;
                    }
                    else {
                        res.send(JSON.stringify({ message: 'Wrong Password' }));
                        return;
                    }
                })
                .catch((error) => {
                    console.error('Error authenticating user salt:', error);
                    res.send(JSON.stringify({ message: 'Login failed' }));
                    return;
                });
        })
        .catch((error) => {
            console.error('Error authenticating user:', error);
            res.send(JSON.stringify({ message: 'Login failed' }));
            return;
        });

}

const Dashboard = (req, res) => {
    res.render("./dashboards/client.ejs")
};

module.exports = {
    Client,
    Authorize,
    Dashboard,

};