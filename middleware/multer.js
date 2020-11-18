const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
      cb(null, + Date.now()+ '-' + file.originalname);
    },
    fileFilter: (req, res, file, cb) => {
      const ext = file.path.extname(file.originalname)
      if (ext !== '.jpg' || ext !== '.png') {
          return cb(res.status(400).end('error'), false);
      }
      cb(null, true)
  }
  })


   
var upload = multer({ storage })


module.exports = upload