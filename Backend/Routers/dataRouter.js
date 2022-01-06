const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');

//routes for various requests in the data controller
router.get('/', dataController.view)
router.post('/',dataController.save)
router.patch('/',dataController.update)
router.delete('/',dataController.delete)

module.exports= router