const db = require("../models");

exports.showpolls = async (req, res, next) => {
  try {
    const polls = await db.Poll.find();

    res.status(200).json(polls);
    //error code 200 = successful
  } catch (err) {
    err.status = 400;
    next(err);
  }
};

exports.createpoll = async (req, res, next) => {
  try {
    console.log(req.decoded);
    const { id } = req.decoded;
    const user = await db.User.findById(id);
    const { question, options } = req.body;
    const poll = await db.Poll.create({
      question,
      user,
      options: options.map(option => ({
        option,
        votes: 0
      }))
    });
    user.polls.push(poll._id);
    await user.save();

    res.status(201).json({ ...poll._doc, user: user._id });
    // _doc is a mongoose shorthand for the doc itself
    //error code 201 = created
  } catch (err) {
    err.status = 400;
    //error code 400 = bad request
    next(err);
  }
};
