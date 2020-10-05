const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const db = require("../../options/keys").mongoURI;
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

mongoose
  .connect(db)
  .then(console.log("instructor ready"))
  .catch((err) => console.log(err));

router.get("/", async (req, res) => {
  res.send("hello");
});

const Instructor = mongoose.model("Instructor");
router.get("/get/:id", async (req, res) => {
  if (req.params.id == 0) {
    np;
    const x = await Instructor.find();

    res.send(x);
  } else if (req.params.id == 1) {
    const x = await Instructor.find();
    let data = [];
    let i;
    for (i = 0; i < x.length; i++) {
      data[i] = x[i].name;
    }
    console.log(data);
    res.send(data);
  }
});
router.post("/new", async (req, res) => {
  const s = await bcrypt.genSalt(10);
  const p = await bcrypt.hash(req.body.password, s);
  const instructor = new Instructor({
    name: req.body.name,
    password: p,

    course: req.body.course,
    verify: true,
    ismaster: req.body.ismaster,
    isadmin: req.body.isadmin,
    balance: 0,
  });
  instructor.save().then((res) => res.send(res));
});
router.get("/getone/:id", async (req, res) => {
  const x = await Instructor.findOne({ _id: req.params.id });
  res.send(x);
});
router.post("/login", async (req, res) => {
  const alias = await Instructor.findOne({
    name: req.body.name,
  });

  if (!alias) {
    res.send("not found");
  } else {
    const result = await bcrypt.compare(req.body.password, alias.password);
    if (!result) {
      res.sendStatus(500);
    } else {
      const payload = {
        name: alias.name,
        ismaster: alias.ismaster,
        isadmin: alias.isadmin,
      };
      const passport = await jwt.sign(payload, config.get("jwtPrivateKey"));
      res.send(passport);
    }
  }
});

module.exports = router;
