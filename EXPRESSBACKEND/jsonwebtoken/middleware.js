const jsonwebtoken = require('../jsonwebtoken/jsonwebtoken.js');

const Authorize = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.redirect('/noaccess');
        return;
    }
    const decoded = jsonwebtoken.verifyJWT(token);
    if (!decoded) {
        res.clearCookie('token');
        res.redirect('/noaccess');
        return;
    }
    if(req.url.includes('admin') && (decoded.user_type !== 'admin')){
        res.clearCookie('token');
        res.redirect('/noaccess');
        return;
    }
    if(req.url.includes('client') && (decoded.user_type !== 'client')){
        res.clearCookie('token');
        res.redirect('/noaccess');
        return;
    }
    next();
}

const SQLClean = (req, res, next) => {
    let { title, author, genre, quantity, dueTime, username} = req.body;

    let search = req.query.search;
    if(!(title === undefined)){
        req.body.title = title.replace(/[^\w\s]/g, "\\$&");
    }
    if(!(author === undefined)){
        req.body.author = author.replace(/[^\w\s]/g, "\\$&");
    }
    if(!(genre === undefined)){
        req.body.genre = genre.replace(/[^\w\s]/g, "\\$&");
    }
    if(!(quantity === undefined)){
        req.body.quantity = quantity.replace(/[^\w\s]/g, "\\$&");
    }
    if(!(dueTime === undefined)){
        req.body.dueTime = dueTime.replace(/[^\w\s]/g, "\\$&");
    }
    if(!(search === undefined)){
        req.query.search = search.replace(/[^\w\s]/g, "\\$&");
    }
    if(!(username === undefined)){
        req.body.username = username.replace(/[^\w\s]/g, "\\$&");
    }
    if(quantity < 0){
        res.send(JSON.stringify({ message: 'Invalid quantity' }));
        return;
    }
    if(dueTime < 0){
        res.send(JSON.stringify({ message: 'Invalid duetime' }));
        return;
    }
    next();
}

module.exports = {
    Authorize,
    SQLClean

}