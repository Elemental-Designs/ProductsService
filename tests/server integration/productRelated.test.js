const request = require('supertest')('http://localhost:2525');
const expect = require('chai').expect;

describe('GET /products/:product_id/related', function () {
  it('Returns an array of related product id\'s', async function () {
    const response = await request.get('/products/1/related');
    const related = response.body;
    expect(Array.isArray(related)).to.eql(true);
    for (let i = 0; i < related.length; i++) {
      expect(typeof related[i]).to.eql('number');
    }
  });

  it('Returns an empty array if there are no related products', async function () {
    const response = await request.get('/products/10/related');
    const related = response.body;
    expect(Array.isArray(related)).to.eql(true);
    expect(related.length).to.eql(0);
  });
});
