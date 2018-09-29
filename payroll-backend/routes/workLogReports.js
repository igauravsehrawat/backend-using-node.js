const express = require('express');
const multer = require('multer');
const { check } = require('express-validator/check');

const router = express.Router();
const { getReport, uploadReport } = require('../controllers/report');
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

router.get(
  '/', [
    check('reportId', 'Report Id must be provided').not().isEmpty(),
  ],
  getReport,
);
router.post('/', upload.single('workLogReport'), fileValidator, uploadReport);

module.exports = router;
