const mongoose = require('mongoose');
const app = require('./server');
const { port, ip, databaseURL } = require('./config.json');

mongoose.connect(databaseURL, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) throw err;
    app.listen(port, ip, () => console.log(`Server is running on ${ip}:${port}`));
});