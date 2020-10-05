const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const auth = require("./middleware/verify");
const authI = require("./middleware/instruct");
const authX = require("./middleware/admin");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const InstructorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  dob: {
    type: Date,
    required: true
  },
  address: String,
  phone: Number,
  email: String,
  password: {
    type: String
  },
  cut: {
    type: Number
  },
  course: {
    type: String
  },
  ismaster: {
    type: Boolean
  },
  isadmin: {
    type: Boolean
  },
  balance: Number
});
const Instructor = mongoose.model("Instructor", InstructorSchema);
const config = require("config");
if (!config.get("jwtPrivateKey")) {
  console.log("ERROR process environment not set code= J64");
  process.exit(1);
}
const morgan = require("morgan");

const students = require("./routes/api/students");

const finance = require("./routes/api/financehist");
const course = require("./routes/api/course");
const instructor = require("./routes/api/instructor");
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("nfo5o");
});
// app.use("/api/admins", admins);
app.use("/api/students", students);
app.use("/api/finance", finance);
app.use("/api/course", course);
app.use("/api/instructor", instructor);

// app.use("/api/course", [auth, authI], course);
// app.use("/api/instructor", [auth, authI, authX], instructor);

app.listen(80);
var today = new Date();
var y = today.getFullYear();
var m = today.getMonth();
var d = Date.now();
var t = new Date(d);
console.log("first", t);
console.log("s", today.getDate());
