const jwt = require('jsonwebtoken');

function generateJWT(username, user_type) {
    const secret = process.env.JWTSECRET;
    const payload = {
        username,
        user_type,
        exp: Math.floor(Date.now() / 1000) + (process.env.JWT_EXPIRATION_TIME * 60),
    };

    const token = jwt.sign(payload, secret);

    return token;
}

function verifyJWT(token) {
    try {
        const secret = process.env.JWTSECRET;        
        const decoded = jwt.verify(token, secret);
        
        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
            throw new Error('Token has expired');
        }
        
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateJWT,
    verifyJWT,
};