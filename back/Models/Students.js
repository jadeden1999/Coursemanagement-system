const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const router = express.Router();
const db = require("./config/keys").mongoURI;
//CONNECT TO MONGOOSE
mongoose.connect(db);
router.get("/", (req, res) => {
  res.send("hello");
});
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dateofreg: {
    type: Date
  },
  number: Number,
  paid: Boolean,
  attendance: [Date],
  type: String
});
const Student = mongoose.model("Student", StudentSchema);
const student = new Student({
  name: zabre,
  dateofreg: Date.now(),
  paid: true,
  attendance: [Date.now(), Date.now()],
  type: "DJ"
});

router.post("/new", (req, res) => {
  student.save();
  res.send("hello");
});

module.exports = router;
