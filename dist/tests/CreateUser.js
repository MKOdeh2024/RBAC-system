"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('./your-express-app'); // Replace with the path to your Express app file
describe('Create User API', () => {
    it('should create a new user', (done) => {
        const newUser = {
            userName: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword',
        };
        supertest(app)
            .post('/login')
            .send(newUser)
            .end((err, res) => {
            expect(res.status).to.equal(200); // Assuming your API returns a 200 status on success
            expect(res.text).to.equal('logged in successfully :'); // Modify based on your API response
            done();
        });
    });
});
