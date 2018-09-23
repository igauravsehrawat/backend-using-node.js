const mongoose = require('../services/mongoose');

const WorkLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  hoursWorked: {
    type: Number,
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
  },
  jobGroup: {
    type: String,
    required: true,
  },
});

const WorkLog = mongoose.model('WorkLog', WorkLogSchema);

module.exports = WorkLog;
