const sendResponse = require('../../helpers/sendReponse');
const { generatePayrollReport } = require('../../services/db/WorkLog');

/**
 * @api {get} /payroll-reports/all Get all the payroll data
 *
 * @apiName Get all payroll reports
 * @apiGroup Payroll Report
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
  const payrollReport = await generatePayrollReport();
  return sendResponse(
    res,
    200,
    payrollReport,
    'Payroll generated successfully',
  );
};

module.exports = getReport;
