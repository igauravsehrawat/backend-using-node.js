const { validationResult } = require('express-validator/check');
const sendResponse = require('../../helpers/sendReponse');

const getReport = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendResponse(
      res,
      400,
      {},
      errors.array()[0].msg,
    );
  }
};

module.exports = getReport;
