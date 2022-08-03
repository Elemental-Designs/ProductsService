const models = require('./models.js');

const handleResponse = (res, code, data) => res.status(code).send(data);
const handleError = (res, code, err) => res.status(code).send(err);

module.exports.getProducts = (req, res) => {
  let params = {
    page: req.query.page || 1,
    count: req.query.count || 5
  }
  models.readProducts(params)
    .then((result) => {
      if (result instanceof Error) {
        console.log('Error getting products: ', result);
        handleError(res, 500, result);
      } else {
        handleResponse(res, 200, result.rows);
      }
    });
};

module.exports.getOneProduct = (req, res) => {
  if (!req.params.product_id || Number(req.params.product_id) < 0) {
    handleError(res, 400, 'invalid product_id');
    return;
  };
  models.readOneProduct(req.params)
    .then((result) => {
      if (result instanceof Error) {
        console.log('Error getting product ', req.params.product_id, ': ', result);
        handleError(res, 500, result);
      } else {
        handleResponse(res, 200, result.rows[0]);
      }
    });
};

module.exports.getStyles = (req, res) => {
  if (!req.params.product_id || Number(req.params.product_id) < 0) {
    handleError(res, 400, 'invalid product_id');
  };
  models.readStyles(req.params)
    .then((result) => {
      if (result instanceof Error) {
        console.log('Error getting styles for product ', req.params.product_id, ': ', result);
        handleError(res, 500, result);
      } else {
        handleResponse(res, 200, result.rows[0]);
      }
    });
};

module.exports.getRelated = (req, res) => {
  if (!req.params.product_id || Number(req.params.product_id) < 0) {
    handleError(res, 400, 'invalid product_id');
  };
  models.readRelated(req.params)
    .then((result) => {
      if (result instanceof Error) {
        console.log('Error getting related products for product ', req.params.product_id, ': ', result);
        handleError(res, 500, result);
      } else {
        handleResponse(res, 200, result.rows[0].results);
      }
    });
};