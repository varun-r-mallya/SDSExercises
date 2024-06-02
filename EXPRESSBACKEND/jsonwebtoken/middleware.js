const jsonwebtoken = require('../jsonwebtoken/jsonwebtoken.js');

const Authorize = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.redirect('/');
        return;
    }
    const decoded = jsonwebtoken.verifyJWT(token);
    console.log(decoded);
    if (!decoded) {
        res.redirect('/noaccess');
        return;
    }
    next();
}

module.exports = {
    Authorize,

}