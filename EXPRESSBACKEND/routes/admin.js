const express = require('express');
const Admin = (req, res) => {
    res.render("./login/admin.ejs")
};

module.exports = {
    Admin,

};