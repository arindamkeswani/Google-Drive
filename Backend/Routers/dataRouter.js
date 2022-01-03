const express = require('express');
const router = express.Router();
const dataController = require('../controller/dataController');

router.get('/', dataController.viewFolders)

module.exports= router