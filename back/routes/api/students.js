const express = require("express");

const router = express.Router();
const _ = require("lodash");
const moment = require("moment");
const db = require("../../options/keys").mongoURI;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose
  .connect(db)
  .then(console.log("GREEN LIGHT"))
  .catch(err => console.log(err));
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("hello");
});
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  dateofreg: {
    type: Date
  },
  address: {
    type: String
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  },
  balance: Number,
  paid: Boolean,
  certified: Boolean,
  attendance: [Date],
  type: String,
  note: String,
  status: {
    type: Boolean,
    default: true
  },
  course: String
});
const Student = mongoose.model("Student", StudentSchema);
router.get("/get", async (req, res) => {
  const student = await Student.find();
  let data = [];
  let arr = [];

  for (i = 0; i < student.length; i++) {
    date1 = moment(student[i].dateofreg);
    date2 = date1.format("MM-DD-YY");
    arr = [
      student[i].name,
      date2,
      student[i].type,
      student[i].paid,
      student[i].course,
      student[i].status,
      student[i]._id
    ];

    data.push(arr);
  }
  res.send(data);
});

router.get("/getnum", async (req, res) => {
  const student = await Student.find();
  let e = student.length;

  var obj = {
    num: e
  };
  res.send(obj);
});
//gets id of student for edit
router.get("/getone/:id", async (req, res) => {
  const y = await Student.findOne({ _id: req.params.id });

  date1 = moment(y.dateofreg);

  date2 = date1.format("YYYY-MM-DD");

  let o = {
    name: y.name,
    dateofreg: date2,
    paid: y.paid,
    certified: y.certified,
    attendance: y.attendance,
    type: y.type,
    note: y.note,
    course: y.course,
    status: y.status,
    balance: y.balance,
    Oid: y._id
  };

  res.send(o);
});
router.post("/new", async (req, res) => {
  let name = req.body.name.toUpperCase();
  const student = new Student({
    name: name,
    dateofreg: req.body.dateofreg,
    paid: req.body.paid,
    certified: req.body.certified,
    attendance: req.body.attendance,
    type: req.body.type,
    note: req.body.note,
    course: req.body.course,
    status: req.body.status
  });
  student
    .save()
    .then(t => {
      var l = JSON.stringify(t);
      res.send(l);
    })
    .catch(err => res.send(err));
});
router.put("/edit/:id", async (req, res) => {
  Student.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      dateofreg: req.body.dateofreg,
      note: req.body.note,
      status: req.body.status
    }
  ).then(r => console.log(r));
});

module.exports = router;
