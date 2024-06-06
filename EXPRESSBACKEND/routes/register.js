const database = require('../database/database');
const passwords = require('../passwords/passwords.js');

const Register = (req, res) => {
    res.render("./login/register.ejs")
};

const Save = (req, res) => {
    const { username, password, confirm_password} = req.body;
    let query, querysalt;
    if (password !== confirm_password) {
        res.send(JSON.stringify({ message: 'Passwords do not match' }));
        return;
    }

    //SQL Injection prevention
    const username_regex = /^[a-zA-Z0-9]+$/;
    const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!username.match(username_regex)) {
        res.send(JSON.stringify({ message: 'Invalid username' }));
        return;
    }
    if (!password.match(password_regex)) {
        res.send(JSON.stringify({ message: 'Password should more than 8 characters long with alphanumeric characters only' }));
        return;
    }


    const password_object = passwords.HashPassword(password);
    const numberCheckQuery = `SELECT COUNT(*) AS count FROM ADMINISTRATORS`;
    let user_type;
    database.querySQL(numberCheckQuery)
    .then((result) => {
        if(result[0].count === 0)
        {
            user_type = 'admin';
            query = `INSERT INTO ADMINISTRATORS (AdminId, AdminPassword) VALUES ('${username}', '${password_object.hashed_password}')`;
            querysalt = `INSERT INTO ADMINISTRATORSALT (AdminId, Salt) VALUES ('${username}', '${password_object.salt}')`;
            database.querySQL(query)
            .then((result) => {
                database.querySQL(querysalt)
                .then((result) => {
                    console.log('User registered successfully');
                    res.send(JSON.stringify({ message: 'User registered successfully' }));
                    return;
                })
                .catch((error) => {
                    console.error('Error registering user salt:', error);
                    res.send(JSON.stringify({ message: 'User registration failed' }));
                    return;
                });
                
            })
        }
        else
        {
            user_type = 'client';
            query = `INSERT INTO CLIENT (ClientId, ClientPassword) VALUES ('${username}', '${password_object.hashed_password}')`;
            querysalt = `INSERT INTO CLIENTSALT (ClientId, Salt) VALUES ('${username}', '${password_object.salt}')`;
            database.querySQL(query)
            .then((result) => {
                database.querySQL(querysalt)
                .then((result) => {
                    console.log('User registered successfully');
                    res.send(JSON.stringify({ message: 'User registered successfully' }));
                    return;
                })
                .catch((error) => {
                    console.error('Error registering user salt:', error);
                    res.send(JSON.stringify({ message: 'User registration failed' }));
                    return;
                });
                
            })
            .catch((error) => {
                console.error('Error registering user:', error);
                if(error.errno === 1062)
                {
                    res.send(JSON.stringify({ message: 'User already exists' }));
                    return;
                }
                else
                res.send(JSON.stringify({ message: 'User registration failed' }));
                return;
            });
        }
    })
    .catch((error) => {
        console.error('Error registering user:', error);
        if(error.errno === 1062)
        {
            res.send(JSON.stringify({ message: 'User already exists' }));
            return;
        }
        else
        res.send(JSON.stringify({ message: 'User registration failed' }));
        return;
    });
}
module.exports = {
    Register,
    Save,

};