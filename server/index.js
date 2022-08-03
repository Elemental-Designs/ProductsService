require('dotenv').config();
const express = require('express');
// const morgan = require('morgan');
const productRouter = require('./routes.js');

const port = process.env.SERVER_PORT || 2525;

const app = express();

// app.use(morgan('tiny'));
app.use(express.json());

app.use('/', productRouter);

app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});

module.exports = app;