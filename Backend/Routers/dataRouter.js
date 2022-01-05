const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');

router.get('/', dataController.view)
router.post('/',dataController.save)
router.patch('/',dataController.update)

module.exports= router