const jwt = require("jsonwebtoken");

const db = require("../models");

//module exports isnt needed as we spread it all out in our index
exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;
    const token = jwt.sign({ id, username }, process.env.SECRET);
    res.status(201).json({ id, username, token });
    // status error code, 201 shows when user has been created.
    // next();
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Username Taken";
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    const { id, username } = user;
    const valid = await user.comparePasswords(req.body.password);
    if (valid) {
      const token = jwt.sign({ id, username }, process.env.SECRET);
      res.json({ id, username, token });
    } else {
      throw new Error();
    }
  } catch (err) {
    err.message = "Invalid Username/Password";
    next(err);
  }
};
