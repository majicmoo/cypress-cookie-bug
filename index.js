var express = require("express");
var app = express();
var path = require("path");
var session = require("express-session");
var uuid = require("uuid/v4");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

app.use(cookieParser());
app.use(bodyParser.json());

const user = "user1";
const user2 = "user2";

const users = [user, user2];

const userPassword = "password";

let sessions = [];

app.use(
  session({
    genid: function(req) {
      const sessionId = uuid();
      console.log("hello", sessionId);

      return sessionId; // use UUIDs for session IDs
    },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  console.log("requested session id", req.sessionID);
  console.log("currentSessions", sessions);

  if (!req.sessionID) {
    return res.send(200, "unauthorised");
  }

  if (sessions.findIndex(a => a == req.sessionID) === -1) {
    return res.send(200, "unauthorised");
  }
  return next();
};

// Login endpoint
app.post("/api/login", function(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.send("login failed");
  } else if (users.includes(username) && password === userPassword) {
    req.session.user = user;
    res.cookie("username", username, {
      domain: "something.megantestingthings.com",
      path: "/"
    });
    console.log("adding " + req.sessionID + " to sessions");
    sessions.push(req.sessionID);
    res.send("login success!");
  } else {
    res.send("login failed");
  }
});

// Logout endpoint
app.get("/logout", function(req, res) {
  sessions = [];
  console.log("removing " + req.sessionID + " from sessions");

  req.session.destroy();

  res.clearCookie("username");
  res.send("logout success!");
});

app.get("/", auth, function(req, res) {
  res.sendFile(path.join(__dirname + "/html/index.html"));
});

app.get("/page-2", auth, function(req, res) {
  res.sendFile(path.join(__dirname + "/html/page2.html"));
});

app.listen(3000);
console.log("app running at http://localhost:3000");
