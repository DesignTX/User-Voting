module.exports = {
  ...require("./auth"),
  //spreads out all the individual handlers inside our /auth
  ...require("./poll")
  //refering to handlers/poll.js
};

module.exports.errors = (err, req, res, next) => {
  res.status(err.status || 400).json({
    err: err.message || "Something went wrong"
  });
};
// error 500 means server is broken, 400 shows something went wrong.

module.exports.notFound = (req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
};
