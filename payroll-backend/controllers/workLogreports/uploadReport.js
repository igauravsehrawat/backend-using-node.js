const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const csvParser = Promise.promisify(require('csv-parse'));

const sendResponse = require('../../helpers/sendReponse');
const { generatePayrollReport, insertReport } = require('../../services/db/WorkLog');
const { doesReportIdExist } = require('../../validators');

const csvParserOptions = {
  ltrim: true,
};

/**
 * @api {post} /workLogReports Upload work log report to archive in the DB
 *
 * @apiName Upload WorkLog Report
 * @apiGroup WorkLog Report
 *
 * @apiParam {file} a csv file with file's fieldname of `workLogReport`
 *
 * @apiSuccess {TODO} todo TODO
 * @apiSuccess {TODO} todo TODO
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
