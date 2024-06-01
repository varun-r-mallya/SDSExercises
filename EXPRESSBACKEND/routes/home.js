const express = require('express');
module.exports = {
    Homepage: Homepage
};

function Homepage(req, res) {
    res.render("./home/index.ejs");
}