const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    //checking headers for authorization key where the token is stored.
    const token = req.headers.authorization.split(" ")[1];
    //token split into 2 parts prefix and token, this splits the token into a string array and grabs the token removing the prefix
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        next(Error("Failed to Authenticate Token"));
        //if the grabbed token is not correct, it will send this error
      } else {
        req.decoded = decoded;
        next();
        //put decoded into the request object then initiates the data to the next function to be used
      }
    });
  } else {
    next(Error("No Token Provided"));
  }
};
