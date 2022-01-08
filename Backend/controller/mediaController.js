// const express = require('express');
// const mediaRouter = express.Router();

// const multer = require('multer');

// const imageStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: 'Images', 
//       filename: (req, file, cb) => {
//           cb(null, file.fieldname + '_' + Date.now() 
//              + path.extname(file.originalname))
//             // file.fieldname is name of the field (image)
//             // path.extname get the uploaded file extension
//     }
// });

// const imageUpload = multer({
//     storage: imageStorage,
//     limits: {
//       fileSize: 100000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpg)$/)) { 
//          // upload only png and jpg format
//          return cb(new Error('Please upload a Image'))
//        }
//      cb(undefined, true)
//   }
// }) 


// mediaRouter.get('/uploadMedia', (req, res) => { 
//     res.send('Media page'); 
// });

// // For Single image upload
// mediaRouter.post('/uploadMedia', (req, res) => {
//     res.send(req.file)
//     console.log("Image saved");
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

// module.exports= mediaRouter