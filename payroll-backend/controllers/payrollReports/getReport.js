const { validationResult } = require('express-validator/check');

const doesReportIdExist = require('../../validators/doesReportIdExist');
const sendResponse = require('../../helpers/sendReponse');
const { generatePayrollReport } = require('../../services/db/WorkLog');

/**
 * @api {get} /payrollReports Get the payroll data by report id
 *
 * @apiName Get payroll report
 * @apiGroup Payroll Report
 *
 * @apiParam {String} reportId Payroll report to generate for.
 *
 * @apiSuccess {TODO} todo TODO
 * @apiSuccess {TODO} todo TODO
 * @apiVersion 0.1.0
 */

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
  const payrollReport = await generatePayrollReport(reportId);
  return sendResponse(
    res,
    200,
    payrollReport,
    'Payroll generated successfully',
  );
};

module.exports = getReport;
