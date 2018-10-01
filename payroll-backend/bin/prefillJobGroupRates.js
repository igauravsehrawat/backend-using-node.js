const dotenvResult = require('dotenv').config();

if (dotenvResult.error) {
  console.error('Can not start the app without env variables');
  process.exit();
}

const JobGrouRate = require('../models/JobGroupRate');


const prefillDataForJobRates = async () => {
  const jobDocs = [];
  const groupAJob = {
    jobGroup: 'A',
    perHourRate: 20,
    currency: 'CAD',
  };
  const groupBJob = {
    jobGroup: 'B',
    perHourRate: 30,
    currency: 'CAD',
  };
  jobDocs.push(groupAJob);
  jobDocs.push(groupBJob);
  const existingDocs = await JobGrouRate.find({}).lean().exec();
  if (existingDocs.length > 0) {
    console.info('Seems like there is data already. Exiting out.');
    process.exit();
  }
  const insertedDocs = await JobGrouRate.insertMany(jobDocs);
  return insertedDocs;
};

prefillDataForJobRates()
  .then((success) => {
    console.info('success', success);
    process.exit();
  })
  .catch((err) => {
    console.error('err', err);
    process.exit();
  });

module.exports = prefillDataForJobRates;
