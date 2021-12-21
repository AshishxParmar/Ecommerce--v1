const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  sku: {
    type: String,
    // required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  productImage: {
    type: String,
    // required: true,
  },
});
const Product = mongoose.model("ProductData", productSchema);
module.exports = Product;
