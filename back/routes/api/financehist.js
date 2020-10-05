const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
var bodyParser = require("body-parser");
const router = express.Router();
const db = require("../../options/keys").mongoURI;

mongoose.connect(db);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Fhistory = new Schema({
  payment: Number,
  paymentcut: Number,
  date: Date,
  student: String,
  course: String,
  instructor: String,
  operator: String
});

const fhistory = mongoose.model("Fhistory", Fhistory);
const Student = mongoose.model("Student");
const Instructor = mongoose.model("Instructor");
router.get("/history", async (req, res) => {
  const data = await fhistory.find();
  res.send(data);
});
router.put("/edithistory/:id", async (req, res) => {
  fhistory
    .findOneandUpdate({ _id: req.params.id }, req.body)
    .then(r => res.send(r))
    .catch(err => res.send(err));
});

router.post("/newhistory", async (req, res) => {
  console.log("oid", req.headers);
  const student = await Student.findOne({ _id: req.headers.oid });

  const instructor = await Instructor.findOne({ _id: req.headers.authid });
  console.log("instructor", instructor);
  var dollar = req.body.payment;
  var z = student.balance - dollar;

  Student.findOneAndUpdate(
    { _id: req.headers.oid },
    {
      balance: z
    }
  ).then(u => console.log("fdadfda", u));

  var cut = instructor.cut;
  var cut2 = dollar * (cut / 100);
  var tick = Date.now();
  const data = new fhistory({
    payment: req.body.payment,
    paymentcut: cut2,
    date: tick,
    student: student.name,
    course: req.body.course,
    instructor: instructor.name,
    operator: req.headers.auth
  });

  data.save().then(r => {
    res.send(r);
  });
  Instructor.findOneAndUpdate(
    { _id: req.headers.authid },
    {
      balance: instructor.balance + cut2
    }
  ).then(r => console.log(r));
});
router.delete("/deletehistory", async (req, res) => {
  fhistory
    .deletOne({ _id: req.params.id })
    .then(r => res.send(r))
    .catch(err => res.send(err));
});
module.exports = router;
