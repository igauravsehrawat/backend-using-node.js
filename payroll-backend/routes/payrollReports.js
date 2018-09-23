const express = require('express');

const router = express.Router();
const { uploadReport } = require('../controllers/report');

router.get('/', uploadReport);
router.post('/', uploadReport);

module.exports = router;
