const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.text())

app.post('/api/ping', (req, res) => {
    res.send('ok');
});

// register route
app.use('/api/auth', require('./routes/auth'));

// error handling
app.use(require('./middlewares/errorHandler'));

module.exports = app;