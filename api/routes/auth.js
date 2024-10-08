const router = require("express").Router();
const User = require("../models/User");
const bc = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    // const newuser = new User(req.body);
    // await newuser.save();
    const { username, email, password } = req.body;
    const salt = await bc.genSalt(10);
    const hashedPass = await bc.hash(password, salt);
    const newuser = new User({ username, email, password: hashedPass });
    await newuser.save();
    res.status(200).json("A new user created Succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send({ error: "User Not Found" });

    const vaildPassword = await bc.compare(req.body.password, user.password);

    if (!vaildPassword) {
      res.status(403).send("invalid password");
    } else {
      res.status(200).json("the user logined acces");
      res.send(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
