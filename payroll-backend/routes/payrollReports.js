const express = require('express');
const { check } = require('express-validator/check');

const router = express.Router();
const { getReport } = require('../controllers/payrollReports');


router.get(
  '/', [
    check('reportId', 'Report Id must be provided').not().isEmpty(),
  ],
  getReport,
);

module.exports = router;
