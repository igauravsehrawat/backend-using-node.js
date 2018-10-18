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
    console.info('Job Group rate data already exists.');
    return;
  }
  await JobGrouRate.insertMany(jobDocs);
  console.info('Job Group rate data inserted');
};

module.exports = prefillDataForJobRates;
