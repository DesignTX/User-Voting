const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }]
});

//edgecase where you need to use function keyword, otherwise will have global scope and will refer to machine instead of object.
userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    } //if this.isModified it checks if its correct or not, queries database, if everythings normal it moves onto next function to hash the password.
    const hashed = await bcrypt.hash(this.password, 10);
    //hashes the stored password, the 10 shows the strength of the hashed password
    this.password = hashed;
    //the hash is stored into the schema object itself as the password
    return next(); //
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePasswords = async function(attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
    //compares the attempt and the stored password
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model("User", userSchema);
