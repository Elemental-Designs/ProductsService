const request = require('supertest')('http://localhost:2525');
const expect = require('chai').expect;

describe('GET /products', function () {
  it('Returns all products, limited to 5 per page', async function () {
    const response = await request.get('/products');
    expect(response.status).to.eql(200);

    expect(Array.isArray(response.body)).to.eql(true);
    expect(response.body.length).to.eql(5);
  });

  it('Returns products with the correct properties', async function () {
    const response = await request.get('/products');
    const oneProduct = response.body[0];
    expect(typeof oneProduct.id).to.eql('number');
    expect(typeof oneProduct.campus).to.eql('string');
    expect(typeof oneProduct.name).to.eql('string');
    expect(typeof oneProduct.slogan).to.eql('string');
    expect(typeof oneProduct.description).to.eql('string');
    expect(typeof oneProduct.category).to.eql('string');
    expect(typeof oneProduct.default_price).to.eql('string');
  });

  it('Returns default price with cents', async function () {
    const response = await request.get('/products');
    const oneProduct = response.body[0];
    expect(oneProduct.default_price).to.contain('.00');
  });

  it('Returns next 5 products when given page=2, count=5', async function () {
    const response = await request.get('/products?page=2&count=5');
    expect(response.status).to.eql(200);

    const results = response.body;
    expect(Array.isArray(results)).to.eql(true);
    expect(results.length).to.eql(5);
    expect(results[0].id).to.eql(6);
    expect(results[1].id).to.eql(7);
    expect(results[2].id).to.eql(8);
    expect(results[3].id).to.eql(9);
    expect(results[4].id).to.eql(10);
  });

  it('Returns 100 products when given count=100', async function () {
    const response = await request.get('/products?count=100');
    expect(response.status).to.eql(200);

    const results = response.body;
    expect(Array.isArray(results)).to.eql(true);
    expect(results.length).to.eql(100);
  })
});