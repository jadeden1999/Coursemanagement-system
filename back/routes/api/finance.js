const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const router = express.Router();
const db = require("../../options/keys").mongoURI;
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//CONNECT TO MONGOOSE
mongoose.connect(db);

const financeSchema = new Schema({
  money: Number,
  cut: Number
});
module.exports = router;
