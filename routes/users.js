let express = require("express");
const User = require("../model/user");
let router = express.Router();

/* create users listing. */
router.post("/addname", (req, res) => {
  let myData = new User(req.body);
  myData
    .save()
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});
/* get users listing. */
router.get("/allusers", (req, res) => {
  User.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.error(error));
});

module.exports = router;
