const request = require('supertest')('http://localhost:2525');
const expect = require('chai').expect;

before(async function() {
  this.timeout(20000);
  let response = await request.get('/products/1/styles');
  global.styles = response.body;
});

describe('GET /products/:product_id/styles', function () {

  it('Returns product styles with the correct properties', function () {
    expect(typeof global.styles.product_id).to.eql('string');
    expect(Array.isArray(global.styles.results)).to.eql(true);
    const style1 = global.styles.results[0];
    expect(typeof style1.style_id).to.eql('number');
    expect(typeof style1.name).to.eql('string');
    expect(typeof style1.original_price).to.eql('string');
    expect(typeof style1.sale_price).to.eql('object');
    expect(typeof style1['default?']).to.eql('boolean');
    expect(Array.isArray(style1.photos)).to.eql(true);
    expect(typeof style1.skus).to.eql('object');
  });

  it('Returns original price with cents', function () {
    const style1 = global.styles.results[0];
    expect(style1.original_price).to.contain('.00');
  });

  it('Returns sale price as either null or price with cents', function () {
    const style1 = global.styles.results[0];
    if(style1.sale_price) {
      expect(style1.sale_price).to.contain('.00');
    } else {
      expect(style1.sale_price).to.eql(null);
    }
  });

  it('Returns photos as an array of objects with thumbnail url and url', function () {
    const photos = global.styles.results[0].photos;
    photos.forEach((photo) => {
      expect(typeof photo.thumbnail_url).to.eql('string');
      expect(typeof photo.url).to.eql('string');
    });
  });

  it('Returns skus as a nested object with sku_id and corresponding quantity & size', function () {
    const skus = global.styles.results[0].skus;
    for (key in skus) {
      expect(typeof key).to.eql('string');
      expect(typeof skus[key].quantity).to.eql('number');
      expect(typeof skus[key].size).to.eql('string');
    };
  });
});