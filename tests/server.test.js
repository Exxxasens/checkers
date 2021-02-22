const app = require('../server.js');
const supertest = require('supertest');

test('GET /', async () => {

    await supertest(app)
    .get('/')
    .expect(200)
    .then((response) => {
        expect(response.text).toBe('<h1>Hello World!</h1>');
    });

});