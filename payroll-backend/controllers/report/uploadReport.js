const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const csvParser = Promise.promisify(require('csv-parse'));

const sendResponse = require('../../helpers/sendReponse');
const { insertReport } = require('../../services/db/WorkLog');

const csvParserOptions = {
  ltrim: true,
};

const uploadReport = async (req, res) => {
  const fileContent = await fs.readFileAsync(req.file.path, 'utf8');
  const parsedCSV = await csvParser(fileContent, csvParserOptions);
  const docs = await insertReport(parsedCSV);
  return sendResponse(res, 200, docs, 'Report uploaded successfully.');
};

module.exports = uploadReport;
