var express = require("express");
var users = require("../data/index");
var requireLogin = require("../middlewares/index");
var router = express.Router();

router.post("/login", (req, res) => {
  const user = users.find((user) => user.id === req.body.id);
  if (!user) {
    console.log("No such user id exists");
  } else {
    if (req.body.password === user.password) {
      console.log("Password was correct");
      req.session.userId = user.id;
      res.status(200).json({ userId: user.id });
    } else {
      console.log("Invalid password");
    }
  }
});

router.get("/data", requireLogin, (req, res) => {
  res.status(200).json([1, 2, 3]);
});

router.get("/logout", function (req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function () {
    res.redirect("/");
  });
});

module.exports = router;
