const express = require('express');
const Home = require('./routes/home');
const ErrorPage = require('./routes/error');
const admin = require('./routes/admin');
const client = require('./routes/client');
const register = require('./routes/register');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', Home.Homepage);
app.get('/admin', admin.Admin);
app.get('/client', client.Client);
app.get('/register', register.Register);

app.post('/register', register.Save);
app.use(ErrorPage.Error);




const server = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

module.exports = server;
