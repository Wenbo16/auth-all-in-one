var users = require("../data/index");

const requireLogin = (req, res, next) => {
  if (req.session.userId == null) {
    console.log("User is not logged in");
  } else {
    const user = users.find((user) => user.id === req.session.userId);
    if (!user) {
      req.session.destroy();
      console.log("User no longer exists");
    } else {
      req.user = user;
      next();
    }
  }
};

module.exports = requireLogin;
