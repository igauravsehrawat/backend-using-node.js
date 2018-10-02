const sendResponse = require('../../helpers/sendReponse');
const { generatePayrollReport } = require('../../services/db/WorkLog');

/**
 * @api {get} /payrollReports/all Get all the payroll data
 *
 * @apiName Get payroll report
 * @apiGroup Payroll Report
 *
 * @apiSuccess {TODO} todo TODO
 * @apiSuccess {TODO} todo TODO
 * @apiVersion 0.1.0
 */

const getReport = async (req, res, next) => {
  const payrollReport = await generatePayrollReport();
  return sendResponse(
    res,
    200,
    payrollReport,
    'Payroll generated successfull',
  );
};

module.exports = getReport;
