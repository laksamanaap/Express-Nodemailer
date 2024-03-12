const express = require("express");
const responseHelper = require("express-response-helper").helper();
const bodyParser = require("body-parser");
const busboy = require("express-busboy");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(responseHelper);
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

busboy.extend(app, {
  upload: true,
  path: "tmp",
  allowedPath: /./,
});

const port = process.env.PORT || 5000;

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "laksamana.arya1412@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
};

const sendEmailMessages = (data) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info.response;
    }
  });
};

app.post("/api/send-email", async (req, res) => {
  try {
    const { from, to, subject, text } = req.body;
    const data = { from, to, subject, text };
    const emailResponse = await sendEmailMessages(data);
    res.respond({ message: "Email sent successfully", email: emailResponse });
  } catch (error) {
    console.error("Error sending email:", error);
    res.failServerError({ message: "Internal server error", error: error });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
