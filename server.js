var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", function (req, res) {
  const currentUTCDate = new Date().toUTCString();
  const currentUnixTimestamp = new Date().getTime();
  res.send({ unix: currentUnixTimestamp, utc: currentUTCDate });
});

app.get("/api/:date", function (req, res) {
  const currentDate = new Date(req.params.date);
  let currentUTCDate = currentDate.toUTCString();

  if (
    currentDate.toString() === "Invalid Date" &&
    !new Date(Number(req.params.date)).getTime()
  ) {
    res.send({ error: "Invalid Date" });
  }

  let currentUnixTimestamp = currentDate.getTime();
  if (currentUTCDate === "Invalid Date") {
    currentUnixTimestamp = new Date(Number(req.params.date)).getTime();
    currentUTCDate = new Date(currentUnixTimestamp).toUTCString();
  } else {
    currentUTCDate = currentDate.toUTCString();
    currentUnixTimestamp = currentDate.getTime();
  }
  res.send({ unix: currentUnixTimestamp, utc: currentUTCDate });
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
