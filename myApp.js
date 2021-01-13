var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("req.method+ ’ ‘+req.path+’-’+req.ip ");
  next();
});

console.log("Hello World");

app.listen(3001, function() {
  console.log("Listening on port 3000");
});

app.get("/", function(req, res) {
  res.sendFile("/views/index.html", { root: __dirname });
});

app.use(express.static(__dirname + "/public/"));
app.get("/", function(req, res) {
  res.sendFile("/views/index.html", { root: __dirname });
});

app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    return res.json({ message: message.toUpperCase() });
  }
  return res.status(200).json({ message: message });
});

let messageObject = { message: "Hello json" };
app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    var u_ = JSON.parse(JSON.stringify(messageObject));
    u_.message = u_.message.toUpperCase();
    return res.json(u_);
  } else {
    return res.json(messageObject);
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.route("/name").get((req, res) => {
  var string = { name: req.query.first + " " + req.query.last };
  res.json({ name: string });
});
app.post("/name", (req, res) => {
  let answer = req.body.first + " " + req.body.last;
  res.json({ name: answer });
});

module.exports = app;
