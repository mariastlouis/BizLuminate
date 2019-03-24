process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const knex = require('../server/db/config');

const server = require('../server');

chai.use(chaiHttp);

describe('Server tests', () => {
  beforeEach(done => {
    // knex.seed.run()
      // .then( () => {
        done();
      // });
  });

  it('Should get from the test route', () => {
    return chai.request(server)
      .get('/api/v1/test')
      .then(res => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
      })
      .catch(err => {
        throw err;
      });
  });
});
