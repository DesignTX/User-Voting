const router = require("express").Router();

const handle = require("../handlers");
const auth = require("../middleware/auth");

router
  .route("/")
  .get(handle.showpolls)
  .post(auth, handle.createpoll);
//to use middleware, just add before handler post route
//shows all the polls

module.exports = router;
