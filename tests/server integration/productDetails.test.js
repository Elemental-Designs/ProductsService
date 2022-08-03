const request = require('supertest')('http://localhost:2525');
const expect = require('chai').expect;

describe('GET /products/:product_id', function () {
  it('Returns product details with the correct properties', async function () {
    const response = await request.get('/products/1');
    expect(response.status).to.eql(200);

    const details = response.body;
    expect(typeof details.id).to.eql('number');
    expect(typeof details.campus).to.eql('string');
    expect(typeof details.name).to.eql('string');
    expect(typeof details.slogan).to.eql('string');
    expect(typeof details.description).to.eql('string');
    expect(typeof details.category).to.eql('string');
    expect(typeof details.default_price).to.eql('string');
    expect(Array.isArray(details.features)).to.eql(true);
  });

  it('Returns an empty array for features if there are none', async function () {
    const response = await request.get('/products/10');
    expect(response.status).to.eql(200);

    const details = response.body;
    expect(details.features).to.eql([]);
  });

  it('Returns an error if product_id is not valid', async function () {
    const response = await request.get('/products/-1');
    expect(response.status).to.eql(400);
    const response2 = await request.get('/products/asdf');
    expect(response2.status).to.eql(500);
  });
});