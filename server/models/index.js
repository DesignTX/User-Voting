const mongoose = require("mongoose");

mongoose.set("debug", true); //debugger information sent to term
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/voting", { useNewUrlParser: true });

module.exports.User = require("./user");
module.exports.Poll = require("./polls");
