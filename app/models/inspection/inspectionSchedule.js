// models/InspectionScheduleSchema.js
const mongoose = require('mongoose');
const { INSPECTION_SECHEDULE, INSPECTION_SECHEDULE_STATUS } = require('../../shared/constants/enum');

const InspectionScheduleSchema = new mongoose.Schema({
  inspection: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspection', required: true },
  fleet:      { type: mongoose.Schema.Types.ObjectId, ref: 'Fleet', required: true },

  frequency: {
    type: String,
    enum: INSPECTION_SECHEDULE
  },

  frequency_count: { type: Number, default: 0 },

  submission_schedule: {
    type: [String],
    validate: {
      validator: function (value) {
        // make validator work for both document saves and query updates
        let frequency = this.frequency;

        if (this instanceof mongoose.Query) {
          const update = this.getUpdate() || {};
          const $set = update.$set || {};
          frequency = ($set.frequency ?? update.frequency ?? frequency);
        }

        if (!Array.isArray(value)) return false;

        // Allow the sentinel ["0"] for ALL frequencies
        if (value.length === 1 && value[0] === '0') return true;

        if (frequency === 'daily') {
          // daily: ONLY ["0"]
          return false;
        }

        if (frequency === 'weekly') {
          // "1".."7"
          return value.every(d => {
            const n = Number(d);
            return Number.isInteger(n) && n >= 1 && n <= 7;
          });
        }

        if (frequency === 'monthly') {
          // "1".."31"
          return value.every(d => {
            const n = Number(d);
            return Number.isInteger(n) && n >= 1 && n <= 31;
          });
        }

        return false; // unknown frequency
      },
      message:
        "submission_schedule invalid. Allowed: ['0'] for any frequency; for weekly: '1'..'7'; for monthly: '1'..'31'; for daily: only ['0']."
    },
  },

  status: {
    type: String,
    enum: INSPECTION_SECHEDULE_STATUS,
    default: 'non-scheduled'
  }
}, { timestamps: true });

// Optional: when updating only submission_schedule, inject existing frequency so validator has it
InspectionScheduleSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate() || {};
  const $set = update.$set || {};

  if ($set.submission_schedule && (!('frequency' in $set) && !('frequency' in update))) {
    const doc = await this.model.findOne(this.getFilter()).select('frequency').lean();
    if (doc && doc.frequency) {
      if (!update.$set) update.$set = {};
      update.$set.frequency = doc.frequency;
      this.setUpdate(update);
    }
  }
  next();
});

module.exports = mongoose.model('InspectionScheduleSchema', InspectionScheduleSchema);
