const express = require('express');
const multer = require('multer');

const router = express.Router();
const { uploadReport } = require('../controllers/workLogreports');
const { fileValidator } = require('../middlewares/uploadReport');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    return cb(null, true);
  }
  return cb(null, false);
};

const upload = multer({
  dest: 'uploads/',
  fileFilter,
});

router.post('/', upload.single('workLogReport'), fileValidator, uploadReport);

module.exports = router;
