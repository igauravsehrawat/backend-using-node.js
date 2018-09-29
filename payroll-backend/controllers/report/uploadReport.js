const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const csvParser = Promise.promisify(require('csv-parse'));

const sendResponse = require('../../helpers/sendReponse');
const { insertReport } = require('../../services/db/WorkLog');
const { doesReportIdExist } = require('../../validators');

const csvParserOptions = {
  ltrim: true,
};

const uploadReport = async (req, res) => {
  const fileContent = await fs.readFileAsync(req.file.path, 'utf8');
  const parsedCSV = await csvParser(fileContent, csvParserOptions);
  const reportIdExist = await doesReportIdExist(parsedCSV);
  if (reportIdExist) {
    return sendResponse(
      res,
      400,
      {},
      'File with given report Id already exists, one report can be uploaded only once.',
    );
  }
  const docs = await insertReport(parsedCSV);
  return sendResponse(res, 200, docs, 'Report uploaded successfully.');
};

module.exports = uploadReport;
