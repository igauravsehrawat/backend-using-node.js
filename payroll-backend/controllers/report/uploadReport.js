const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const csvParser = Promise.promisify(require('csv-parse'));
const moment = require('moment');

const WorkLog = require('../../models/WorkLog');

const sendResponse = require('../../helpers/sendReponse');

const csvParserOptions = {
  ltrim: true,
};

const docsToInsert = async (parsedCSV) => {
  const rowsCount = parsedCSV.length;
  const lastRowIndex = rowsCount - 1;
  const penultimateRowIndex = rowsCount - 2;
  const reportId = parsedCSV[lastRowIndex][1];
  const docs = [];
  for (let index = 1; index <= penultimateRowIndex; index += 1) {
    const currentRow = parsedCSV[index];
    const doc = {
      date: moment(currentRow[0], 'DD/MM/YYYY').utc().format(),
      hoursWorked: currentRow[1],
      employeeId: currentRow[2],
      jobGroup: currentRow[3],
      reportId,
    };
    docs.push(doc);
  }
  await WorkLog.insertMany(docs);
  return docs;
};

const uploadReport = async (req, res) => {
  const fileContent = await fs.readFileAsync(req.file.path, 'utf8');
  const parsedCSV = await csvParser(fileContent, csvParserOptions);
  const docs = await docsToInsert(parsedCSV);
  return sendResponse(res, 200, docs, 'Report uploaded successfully.');
};

module.exports = uploadReport;
