const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/products', controllers.getProducts);

router.get('/products/:product_id', controllers.getOneProduct);

router.get('/products/:product_id/styles', controllers.getStyles);

router.get('/products/:product_id/related', controllers.getRelated);

module.exports = router;