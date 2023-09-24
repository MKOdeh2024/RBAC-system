const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('./your-express-app'); // Replace with the path to your Express app file

describe('Assign Role to User API', () => {
  it('should assign a role to a user', (done) => {
    const userId = 1; // Replace with a valid user ID
    const roleId = 2; // Replace with a valid role ID

    supertest(app)
      .post(`/user/${userId}/${roleId}`)
      .end((err: any, res: any) => {
        expect(res.status).to.equal(200); // Assuming your API returns a 200 status on success
        expect(res.body.message).to.equal('Role assigned successfully'); // Modify based on your API response
        done();
      });
  });
});
