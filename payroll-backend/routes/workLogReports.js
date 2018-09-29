const express = require('express');
const multer = require('multer');

const router = express.Router();
const { uploadReport } = require('../controllers/report');
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

router.get('/', uploadReport);
router.post('/', upload.single('workLogReport'), fileValidator, uploadReport);

module.exports = router;
