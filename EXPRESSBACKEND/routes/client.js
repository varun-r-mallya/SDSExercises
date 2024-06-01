const express = require('express');

const Client = (req, res) => {
    res.render("./login/client.ejs")
};

module.exports = {
    Client,

};