const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
var bodyParser = require("body-parser");
const router = express.Router();
const db = require("../../config/keys").mongoURI;

mongoose.connect(db);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
mongoose.connect(db);
const historySchema = new Schema({
  payment: Number,
  date: Date,
  student: String,
  course: String
});
