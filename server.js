const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.text())

app.post('/api/ping', (req, res) => {
    res.send('ok');
});


// register route
app.use('/api', require('./routes/auth'));


// error handling
app.use((err, req, res, next) => {
    if (err.error) {
        res.status(401).json(err);
    }
    next();
});

module.exports = app;