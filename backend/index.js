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

      return sessionId;
    },
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  console.log("requested session id", req.sessionID);
  console.log("currentSessions", sessions);

  if (!req.sessionID) {
    return res.status(401).send();
  }

  if (sessions.findIndex(a => a == req.sessionID) === -1) {
    return res.status(401).send();
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
app.get("/api/logout", function(req, res) {
  sessions = [];
  console.log("removing " + req.sessionID + " from sessions");

  req.session.destroy();

  res.clearCookie("username");
  res.send("logout success!");
});

app.get("/api/is-authed", auth, function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send();
});

app.listen(9000);
console.log("app running at http://localhost:9000");
