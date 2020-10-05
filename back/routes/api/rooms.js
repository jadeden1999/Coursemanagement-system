const express = require("express");
const router = express.Router();
const moment = require("moment");
const bodyParser = require("body-parser");
const db = require("../../options/keys").mongoURI;
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
const Schema = mongoose.Schema;

mongoose
  .connect(db)
  .then(console.log("ready"))
  .catch(err => console.log(err));

router.use(
  bodyParser.urlencoded({
    extended: false
  })
);
router.use(bodyParser.json());

const roomSchema = new Schema({
  name: String,
  seats: Number,
  gearlist: [String],
  availability: [String]
});
const roomtypeSchema = new Schema({
  name: String,
  desc: String
});

const Course = mongoose.model("Course", courseSchema);
const Class = mongoose.model("Class", classSchema);
router.get("/get", async (req, res) => {
  const y = await Course.find();

  res.send(y);
});

router.get("/getone/:id", async (req, res) => {
  const y = await Course.findOne({ _id: req.params.id });

  date1 = moment(y.date);

  date2 = date1.format("YYYY-MM-DD");

  let o = {
    name: y.name,
    date: date2,
    instructor: y.paid,
    cost: y.cost
  };

  res.send(o);
});

router.post("/new", async (req, res) => {
  const y = req.body;

  const course = new Course({
    name: y.name,
    date: y.date,
    instructor: y.instructor,
    cost: y.cost,
    sessions: [
      {
        num: y.num,
        desc: y.desc,
        time: y.time,
        teacher: y.teacher,
        cut: y.cut,
        price: y.price
      }
    ]
  });
  course
    .save()
    .then(t => {
      var l = JSON.stringify(t);
      res.send(l);
    })
    .catch(err => res.send(err));
});
router.post("/newclass/:id", async (req, res) => {
  const y = req.body;
  const o = req.params.id;
  let struct = await Course.findOne({ _id: o });

  const clas = new Class({
    name: y.name,
    date: y.date,
    instructor: y.instructor,
    cost: y.cost,
    sessions: [
      {
        num: y.num,
        desc: y.desc,
        time: y.time,
        teacher: y.teacher,
        cut: y.cut,
        price: y.price
      }
    ]
  });

  clas
    .save()
    .then(t => {
      var l = JSON.stringify(t);
      res.send(l);
    })
    .catch(err => res.send(err));
});
router.put("/edit/:id", async (req, res) => {
  y = req.body;
  Course.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: y.name,
      date: req.headers.date,
      instructor: req.headers.auth,
      cost: y.cost,
      date: y.date,
      sessions: y.sessions
    }
  ).then(r => console.log(r));
});
router.delete("/delete/:id", async (req, res) => {
  Course.deleteOne({
    _id: req.params.id
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
});
router.put("/register/:id", async (req, res) => {
  let data = await Student.findOne({ _id: req.params.id });

  if (!data.course) {
    Student.findOneAndUpdate(
      { _id: req.params.id },
      {
        course: req.body.name,
        balance: req.body.balance,
        status: true
      }
    ).then(r => {
      var l = JSON.stringify(r);
      res.send(l);
      console.log(l);
    });
  } else {
    res.send(`ERROR USER ALREADY REGISTERED IN COURSE ${data.course}`);
  }
});

router.put("/attendance/:id", async (req, res) => {
  let data = await Student.findOne({ _id: req.params.id });
  let date = Date.now();
  let x = data.attendance;

  let i = x.length;
  x[i] = date;

  Student.findOneAndUpdate(
    { _id: req.params.id },
    {
      attendance: x
    }
  ).then(r => {
    var l = JSON.stringify(r);
    res.send(l);
    console.log(l);
  });
});
module.exports = router;
