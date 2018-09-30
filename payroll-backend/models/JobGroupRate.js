const mongoose = require('../services/mongoose');

const JobGroupRateSchema = {
  jobGroup: {
    type: String,
    unique: true,
    required: true,
  },
  perHourRate: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
};

const JobGroupRate = mongoose.model('JobGroupRate', JobGroupRateSchema);

module.exports = JobGroupRate;
