const express = require('express');
const cookieParser = require('cookie-parser');

const middleware = require('./jsonwebtoken/middleware.js')
const Home = require('./routes/home');
const ErrorPage = require('./routes/error');
const admin = require('./routes/admin');
const client = require('./routes/client');
const register = require('./routes/register');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', Home.Homepage);
app.get('/noaccess', Home.NoAccess);
app.get('/favicon.ico', (req, res) => {
  res.sendFile('./favicon.png', { root: __dirname });
});
app.get('/admin', admin.Admin);
app.get('/client', client.Client);
app.get('/register', register.Register);

app.post('/register', register.Save);
app.post('/admin', admin.Authorize);
app.post('/client', client.Authorize);

app.use(middleware.Authorize);
app.use(express.json());

app.get('/admin/dashboard', admin.Dashboard);
app.get('/client/dashboard', client.Dashboard);

app.use(middleware.SQLClean);
//admin
app.post('/admin/addbooks', admin.AddBooks);
app.post('/admin/deletebooks', admin.Delete);
app.post('/admin/updatebooks', admin.Update);
app.get('/admin/viewbook', admin.View);
app.post('/admin/manageadmins', admin.ManageAdmins);
app.post('/admin/acceptcheckout', admin.AcceptCheckOut);
app.post('/admin/acceptcheckin', admin.AcceptCheckIn);
app.post('/admin/handlefine', admin.HandleFine);


//client

app.get('/client/viewbook', client.View);
app.post('/client/previleges', client.AdminPreviledges);
app.post('/client/checkout', client.CheckOut);
app.post('/client/checkin', client.CheckIn);

app.use(ErrorPage.Error);





const server = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

module.exports = server;
