require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.PRODUCTS_DB_NAME}`);

const productSchema = new mongoose.Schema(
  {
    id: ObjectID(Number),
    campus: {
      type: String,
      default: 'hr-rfp'
    },
    name: {
      type: String,
      required: true
    },
    slogan: String,
    description: String,
    category: String,
    default_price: {
      type: String,
      required: true
    },
    features: [{}],
    related: [Number]
  },
  { timestamps: true } // will automatically create and set `createdAt` and `updatedAt` timestamps
);

const styleSchema = new mongoose.Schema({
  style_id: ObjectID(Number),
  product_id: ObjectID(Number),
  name: {
    type: String,
    required: true
  },
  original_price: String,
  sale_price: String,
  'default?': {
    type: Boolean,
    required: true
  },
  photos: [{}],
  skus: {{}}
});

const Product = new mongoose.model('Product', productSchema);
const Style = new mongoose.model('Style', styleSchema);

module.exports = { Product, Style };
