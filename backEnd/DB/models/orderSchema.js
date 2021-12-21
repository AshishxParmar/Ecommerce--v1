const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "USER",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        itemTotal: { type: Number, required: true },
        // product: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   required: true,
        //   ref: 'Product',
        // },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: Number, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      paymentID: { type: String },
      orderID: { type: String },
      sign: { type: String },
      status: { type: String, default: "pending" },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Orderdata", orderSchema);

module.exports = Order;
