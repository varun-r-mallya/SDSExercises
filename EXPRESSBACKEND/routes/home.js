const express = require('express');
module.exports = {
    Homepage: Homepage,
    NoAccess: NoAccess,
};

function Homepage(req, res) {
    res.render("./home/index.ejs");
}

function NoAccess(req, res) {
    res.render("./login/noaccess.ejs");
}