const app = require('./server');
const { port, ip } = require('./config.json');

app.listen(port, ip, () => console.log(`Server is running on ${ip}:${port}`));