var express = require('express');
var router = express.Router();

const UserController = require('../controller').UserController;

/* GET users listing. */
router.get('/', UserController.getAll);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/', UserController.delete);
module.exports = router;
