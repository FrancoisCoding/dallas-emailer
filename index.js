const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options("/", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

const port = process.env.PORT || 5000;

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  })
);

app.listen(port, () => console.log("listening on port " + port));
app.post("/", (req, res) => {
  req.body.entity
    ? (mailOptions = {
        from: process.env.USER,
        to: "francoisisaiaht@yahoo.com",
        subject: "True Inspections Contact",
        text: `Hi, my name is ${req.body.first_name} ${req.body.last_name}. Please reach out to me with additional information. My email address is ${req.body.email} and my phone number is ${req.body.phone}. Type of inspection is ${req.body.entity}.`,
      })
    : (mailOptions = {
        from: process.env.USER,
        to: "francoisisaiaht@yahoo.com",
        subject: "True Inspections Contact",
        text: `Hi, my name is ${req.body.first_name} ${req.body.last_name}. Please reach out to me with additional information. My email address is ${req.body.email} and my phone number is ${req.body.phone}.`,
      });
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: "true" });
    }
  });
});
