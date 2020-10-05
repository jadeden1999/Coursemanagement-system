const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
var bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const db = require("../../config/keys").mongoURI;

mongoose.connect(db);

const Admin = new Schema({
  root: String,
  password: String,
  isroot: Boolean,
  ismaster: Boolean
});
const admin = mongoose.model(Admin, "admin");
router.put("./pass", async (req, res) => {});

module.exports = router;
