const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

const shortId = require("shortid");

const razorpay = new Razorpay({
  key_id: "rzp_test_Y3MY1kL1YOmNmT",
  key_secret: "TDZwsCr6i2YgcKQeN98p7otL",
});

router.post("/razorpay", async (req, res) => {
  const payment_capture = 1;

  try {
    const response = await razorpay.orders.create({
      amount: req.body.onlineProduct.totalPrice * 100,
      currency: "INR",
      receipt: shortId.generate(),
      payment_capture,
    });
    console.log("response", response);
    res.status(201).json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
