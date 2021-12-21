const express = require("express");
const router = express.Router();
const Order = require("../DB/models/orderSchema");
const authenticate = require("../middleware/authenticate");

router.post("/orderdata", authenticate, async (req, res) => {
  try {
    const orders = new Order(req.body);
    const Addorders = await orders.save();
    res.status(201).send(Addorders);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orderdata = await Order.find().populate("user", "name email");
    res.send(orderdata);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

router.get("/getmyorder", authenticate, async (req, res) => {
  try {
    const orderdata = await Order.find({ user: req.user._id });
    res.status(201).send(orderdata);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

router.get("/getoneorder/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const oneorder = await Order.findById({ _id: _id }).populate(
      "user",
      "name"
    );
    res.send(oneorder);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
