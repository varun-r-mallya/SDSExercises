const Error = (req, res) => {
    res.render("./error/index.ejs", { url: req.url.slice(1, ) });

};

module.exports = {
    Error,

};