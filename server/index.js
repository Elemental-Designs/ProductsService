require('dotenv').config();
require('newrelic');
const express = require('express');
// const morgan = require('morgan');
const productRouter = require('./routes.js');
const path = require('path');

const port = process.env.SERVER_PORT || 3000;

const app = express();

// app.use(morgan('tiny'));
app.use(express.json());
app.get('/loader*', (req, res) => { res.sendFile(path.join(__dirname, '..', 'loaderio.txt')); });

app.use('/', productRouter);

app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});

module.exports = app;