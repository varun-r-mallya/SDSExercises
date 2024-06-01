const crypto = require('crypto');

function hasher(salted_password) {
  return crypto.createHash('sha256').update(salted_password).digest('hex');
}

function salter(password) {
    const salt_first = generateRandomString(32);
    const salt_second = process.env.GLOBALSALT;
    const password_object = {
        hashed_password: `${salt_first}${password}${salt_second}`,
        salt: salt_first,
    } 
    return password_object;

}
function HashPassword(password) {
    password_object = salter(password);
    password_object.hashed_password = hasher(password_object.hashed_password);
    console.log(password_object)
    return password_object;
}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

module.exports = {
    HashPassword,
}