const { validationResult } = require('express-validator/check');

const doesReportIdExist = require('../../validators/doesReportIdExist');
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
  const { reportId } = req.query;
  const reportIdExistence = await doesReportIdExist(reportId);
  if (!reportIdExistence) {
    return sendResponse(
      res,
      400,
      {},
      `Report id: ${reportId}, does not exists.`,
    );
  }
};

module.exports = getReport;
