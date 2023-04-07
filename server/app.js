var express = require("express");
var path = require("path");
var cors = require("cors");
var session = require("express-session");
var googleRouter = require("./routes/google");
var sessionRouter = require("./routes/session");

var app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    // you have to use credentials property in order to configure Access-Control-Allow-Credentials:
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// Use the session middleware
app.use(
  session({
    secret: "secret",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

app.use("/session", sessionRouter);
app.use("/google", googleRouter);

module.exports = app;
