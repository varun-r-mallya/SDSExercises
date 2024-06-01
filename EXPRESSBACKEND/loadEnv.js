const dotenv = require('dotenv');
dotenv.config();

const loadEnvVariables = () => {
  return {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    PORT: process.env.PORT,
  };
};

module.exports = loadEnvVariables;
