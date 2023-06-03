var express = require('express');
var router = express.Router();
const models = require("../models");

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().spread(function(user, created){
    res.send({"user": user, "created": created});
  });
});

module.exports = router;
