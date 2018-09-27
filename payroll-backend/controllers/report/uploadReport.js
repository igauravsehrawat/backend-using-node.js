const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const csvParser = Promise.promisify(require('csv-parse'));

const csvParserOptions = {
  ltrim: true,
};

const uploadReport = async (req, res) => {
  const fileContent = await fs.readFileAsync(req.file.path, 'utf8');
  const parsedCSV = await csvParser(fileContent, csvParserOptions);
  res.status(200).send(parsedCSV);
};

module.exports = uploadReport;
