const mongoose = require('mongoose');
const { INSPECTION_SECHEDULE, INSPECTION_SECHEDULE_STATUS } = require('../../shared/constants/enum');
const InspectionScheduleSchema = new mongoose.Schema({
  inspection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inspection',
    required: true
  },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
  fleet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fleet',
    required: true
  },
  frequency:{
    type:String,
    enum:INSPECTION_SECHEDULE
  },
  frequency_count:{
     type:Number,
     default:0
  },
 submission_schedule: {
    type: [String], // array of stringified numbers: ["0"], ["1", "2"]
    validate: {

      validator: function (value) {
        const frequency = this.frequency;

        // Must be an array
        if (!Array.isArray(value)) return false;

        // Daily → must be ["0"]
        if (frequency === "daily") {
          return value.length === 1 && value[0] === "0";
        }

        // Weekly → values 1–7 (weekdays)
        if (frequency === "weekly") {
          return value.every((day) => {
            const num = parseInt(day, 10);
            return !isNaN(num) && num >= 1 && num <= 7;
          });
        }

        // Monthly → values 1–31 (calendar days)
        if (frequency === "monthly") {
          return value.every((day) => {
            const num = parseInt(day, 10);
            return !isNaN(num) && num >= 1 && num <= 31;
          });
        }

        return false; // if frequency is unknown
      },
      message:
        "submission_schedule must match the frequency: ['0'] for daily, 1–7 for weekly, 1–31 for monthly",
    },
  },
  status: {
    type: String,
    enum: INSPECTION_SECHEDULE_STATUS,
    default:'non-scheduled'
  }
}, { timestamps: true });

module.exports = mongoose.model('InspectionScheduleSchema', InspectionScheduleSchema); 