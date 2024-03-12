const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const busboy = require("express-busboy");
const nodemailer = require("nodemailer");

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port);
