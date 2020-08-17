// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// API string to date object endpoint
app.get("/api/timestamp/:date_string?", (req, res) => {
  const time = req.params.date_string;
  if (time) {
    const unix = Date.parse(time) || Number(time);
    const utc = new Date(unix).toUTCString();
    res.json(unix ? { unix, utc } : { error: "Invalid Date" });
  } else {
    const currDate = new Date();
    res.json({
      unix: currDate.getTime(),
      utc: currDate.toUTCString(),
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// trolledwoods was here
