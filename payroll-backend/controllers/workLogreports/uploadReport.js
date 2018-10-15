const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const csvParser = Promise.promisify(require('csv-parse'));

const sendResponse = require('../../helpers/sendReponse');
const { insertReport } = require('../../services/db/WorkLog');
const { doesReportIdExist } = require('../../validators');

const csvParserOptions = {
  ltrim: true,
};

/**
 * @api {post} /worklog-reports Upload work log report to archive in the DB
 *
 * @apiName Upload WorkLog Report
 * @apiGroup WorkLog Report
 *
 * @apiParam {file} a csv file with file's fieldname of `workLogReport`
 *
 * @apiSuccess {String} status Success
 * @apiSuccess {Array} data Array of object
 * @apiSuccess {String} message message to display at frontend
 * @apiSuccessExample
  {
      "status": "Success",
      "data": [
          {
              "date": "2016-11-13T18:30:00Z",
              "hoursWorked": "7.5",
              "employeeId": "1",
              "jobGroup": "A",
              "reportId": "44"
          },
          {
              "date": "2016-11-08T18:30:00Z",
              "hoursWorked": "4",
              "employeeId": "2",
              "jobGroup": "B",
              "reportId": "44"
          },
          {
              "date": "2016-11-09T18:30:00Z",
              "hoursWorked": "4",
              "employeeId": "2",
              "jobGroup": "B",
              "reportId": "44"
          },
          {
              "date": "2016-11-08T18:30:00Z",
              "hoursWorked": "11.5",
              "employeeId": "3",
              "jobGroup": "A",
              "reportId": "44"
          },
      ],
      "message": "Report uploaded successfully."
  }
 * @apiVersion 0.1.0
 */

const uploadReport = async (req, res) => {
  const fileContent = await fs.readFileAsync(req.file.path, 'utf8');
  await fs.unlinkAsync(req.file.path);
  const parsedCSV = await csvParser(fileContent, csvParserOptions);
  const rowsCount = parsedCSV.length;
  const lastRowIndex = rowsCount - 1;
  const reportId = parsedCSV[lastRowIndex][1];
  const reportIdExist = await doesReportIdExist(reportId);
  if (reportIdExist) {
    return sendResponse(
      res,
      400,
      {},
      'File with given report Id already exists, one report can be uploaded only once.',
    );
  }
  const report = await insertReport(parsedCSV);
  return sendResponse(res, 200, report, 'Report uploaded successfully.');
};

module.exports = uploadReport;
