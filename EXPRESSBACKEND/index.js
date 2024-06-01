const server = require('./server');
const dotenv = require('dotenv');
const database = require('./database/database');
dotenv.config();

const dbConnection = database.connectToSQL();

server();
