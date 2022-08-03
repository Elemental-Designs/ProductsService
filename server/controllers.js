const models = require('./models.js');

const handleResponse = (res, data, code) => res.status(code).send(data);
const handleError = (res, err) => res.status(500).send(err);

module.exports.getProducts = (req, res) => {
  let params = {
    page: req.query.page || 1,
    count: req.query.count || 5
  }
  models.readProducts(params)
    .then(({rows}) => handleResponse(res, rows, 200))
    .catch((err) => console.log('Error getting products: ', err));
};

module.exports.getOneProduct = (req, res) => {
  if (!req.params.product_id) {
    handleError(res, 'invalid product_id');
  };
  let params = {
    product_id: req.params.product_id
  };
  models.readOneProduct(params)
  .then(({rows}) => handleResponse(res, rows[0], 200))
  .catch((err) =>
    console.log('Error getting product ', req.params.product_id, ': ', err));
};

module.exports.getStyles = (req, res) => {
  if (!req.params.product_id) {
    handleError(res, 'invalid product_id');
  };
  let params = {
    product_id: req.params.product_id
  };
  models.readStyles(params)
  .then(({rows}) => handleResponse(res, rows[0], 200))
  .catch((err) =>
    console.log('Error getting styles for product ', req.params.product_id, ': ', err));
};

module.exports.getRelated = (req, res) => {
  if (!req.params.product_id) {
    handleError(res, 'invalid product_id');
  };
  let params = {
    product_id: req.params.product_id
  };
  models.readRelated(params)
  .then(({rows}) => handleResponse(res, rows[0].results, 200))
  .catch((err) =>
    console.log('Error getting related products for product ', req.params.product_id, ': ', err));
};