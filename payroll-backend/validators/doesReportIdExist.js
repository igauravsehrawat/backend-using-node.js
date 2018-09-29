const WorkLog = require('../models/WorkLog');


const doesReportIdExist = async (parsedCSV) => {
  const rowsCount = parsedCSV.length;
  const lastRowIndex = rowsCount - 1;
  const reportId = parsedCSV[lastRowIndex][1];
  const reportIdPresence = await WorkLog.findOne({
    reportId,
  }).lean().exec();
  if (reportIdPresence) {
    return true;
  }
  return false;
};

module.exports = doesReportIdExist;
