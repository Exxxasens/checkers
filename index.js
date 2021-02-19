const express = require('express');
const app = express();
const { port, ip } = require('./config.json');

app.get('/', (req, res) => {
    res.send(`
        <h1>Hello World!</h1>
    `);
});

app.listen(port, ip, () => console.log(`Server is running on ${ip}:${port}`));