const express = require("express");
const router = express.Router();
require("../DB/moongose");
const User = require("../DB/models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticate = require("../middleware/authenticate");

router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(422).json({ error: "Fill the field properly" });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const user = new User({ name, email, phone, password });

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);

    const userRegsiter = await user.save();
    if (userRegsiter) {
      return res.status(201).json({ message: "User registered Successful" });
    } else {
      return res.status(422).json({ error: "Registraion Failed" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/Login", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(420).json({ error: "Please fill the Details" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();

      if (!isMatch) {
        res.status(400).json({ error: "enter correct credentials password" });
      } else {
        res.json({ message: "user login successfully", token, userLogin });
      }
    } else {
      res.status(400).json({ error: "enter correct credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});
router.get("/users/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const userdata = await User.findById({ _id: _id });
    res.send(userdata);
  } catch (e) {
    res.send(e);
  }
});

// router.patch("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;

//     const updateUser = await User.findByIdAndUpdate(_id, req.body);
//     res.send(updateUser);
//   } catch (e) {
//     res.send(e);
//   }
// });
router.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("user not found");

    const updates = Object.keys(req.body);

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.json({ success: true, message: "profile updated", user });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;
