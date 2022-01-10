const express = require('express');
const router = express.Router();
const galleryController = require('../controller/galleryController');

//routes for various requests in the media controller
router.get('/', galleryController.view)
router.get('/:id', galleryController.getMedia)
// router.post('/uploadMedia',mediaController.upload)
// router.patch('/',dataController.update)
// router.delete('/',dataController.delete)

module.exports= router
