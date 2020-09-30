const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

console.log();

app.listen(port, () => console.log("listening on port " + port));
app.post("/", (req, res) => {
  req.body.entity
    ? (mailOptions = {
        from: process.env.USER,
        to: "info@quadruplejcapital.com",
        subject: "Quadruple J Capital Contact",
        text: `Hi, my name is ${req.body.first_name} ${req.body.last_name}. Please reach out to me with additional information. My email address is ${req.body.email} and my phone number is ${req.body.phone}. My entity is ${req.body.entity}.`,
      })
    : (mailOptions = {
        from: process.env.USER,
        to: "info@quadruplejcapital.com",
        subject: "Quadruple J Capital Contact",
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
