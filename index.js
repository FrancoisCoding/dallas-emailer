const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_PUBLIC_KEY,
  process.env.MAILJET_PRIVATE_KEY
);

app.listen(port, () => console.log("listening on port " + port));

app.post("/", (req, res) => {
  console.log("req body", req.body);
  const send = mailjet.post("send", { version: "v3.1" });
  const requestObject = {
    Messages: [
      {
        From: {
          Email: req.body.email,
          Name: `${req.body.first_name} ${req.body.last_name}`,
        },
        To: [
          {
            Email: "info@quadruplejcapital.com",
          },
        ],
        Subject: "Quadruple",
        TextPart: `My email is ${req.body.email} please let me know what are the further steps. My phone number is ${req.body.phone}`,
        HTMLPart: "",
      },
    ],
  };

  send
    .request(requestObject)
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: err,
      });
    });
});
