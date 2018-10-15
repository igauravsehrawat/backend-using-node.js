const { validationResult } = require('express-validator/check');

const doesReportIdExist = require('../../validators/doesReportIdExist');
const sendResponse = require('../../helpers/sendReponse');
const { generatePayrollReport } = require('../../services/db/WorkLog');

/**
 * @api {get} /payroll-reports Get the payroll data by report id
 *
 * @apiName Get payroll report
 * @apiGroup Payroll Report
 *
 * @apiParam {String} reportId Payroll report to generate for.
 *
 * @apiSuccess {String} status Success
 * @apiSuccess {Array} data Array of object
 * @apiSuccess {String} message message to display at frontend
 * @apiSuccessExample
 *
  {
      "status": "Success",
      "data": [
          {
              "employeeId": 1,
              "payPeriod": "01/11/2016 - 15/11/2016",
              "amountPaid": "$150"
          },
          {
              "employeeId": 1,
              "payPeriod": "16/11/2016 - 30/11/2016",
              "amountPaid": "$220"
          },
          {
              "employeeId": 1,
              "payPeriod": "01/12/2016 - 15/12/2016",
              "amountPaid": "$150"
          },
          {
              "employeeId": 1,
              "payPeriod": "16/12/2016 - 31/12/2016",
              "amountPaid": "$220"
          },
          {
              "employeeId": 2,
              "payPeriod": "01/11/2016 - 15/11/2016",
              "amountPaid": "$930"
          },
          {
              "employeeId": 2,
              "payPeriod": "01/12/2016 - 15/12/2016",
              "amountPaid": "$930"
          },
          {
              "employeeId": 3,
              "payPeriod": "01/11/2016 - 15/11/2016",
              "amountPaid": "$590"
          },
      ],
      "message": "Payroll generated successfully"
  }
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
