// schemas/inspectionSchedule.schema.js
const Joi = require('joi');
const objectId = require('./objectId.schema');
const BaseSchema = require('./base.schema');
const {
  INSPECTION_SECHEDULE,
  INSPECTION_SECHEDULE_STATUS
} = require('../shared/constants/enum');

const stringifiedIntInRange = (min, max) =>
  Joi.string().pattern(/^\d+$/).custom((v, h) => {
    const n = Number(v);
    if (!Number.isInteger(n) || n < min || n > max) return h.error('any.invalid');
    return v;
  }, 'stringified integer range');

const submissionSchedule = Joi.array()
  .items(Joi.string().pattern(/^\d+$/))
  .custom((value, helpers) => {
    const payload = helpers?.state?.ancestors?.[0] || {};
    const frequency = payload.frequency;

    if (!Array.isArray(value)) return helpers.error('array.base');

    // allow ["0"] for all frequencies
    const zeroOnly = value.length === 1 && value[0] === '0';
    if (zeroOnly) return value;

    if (frequency === 'daily') {
      return helpers.error('any.custom', {
        custom: "For 'daily', submission_schedule must be exactly ['0']"
      });
    }

    if (frequency === 'weekly') {
      const { error } = Joi.array().items(stringifiedIntInRange(1, 7)).validate(value);
      if (!error) return value;
      return helpers.error('any.custom', {
        custom: "For 'weekly', submission_schedule must be ['0'] OR stringified integers in 1–7"
      });
    }

    if (frequency === 'monthly') {
      const { error } = Joi.array().items(stringifiedIntInRange(1, 31)).validate(value);
      if (!error) return value;
      return helpers.error('any.custom', {
        custom: "For 'monthly', submission_schedule must be ['0'] OR stringified integers in 1–31"
      });
    }

    return helpers.error('any.custom', { custom: 'Unknown frequency; cannot validate submission_schedule' });
  }, 'submission_schedule frequency coupling')
  .messages({
    'array.base': 'submission_schedule must be an array of stringified numbers',
    'any.custom': '{{#custom}}',        // ← ensure custom text shows up
    'any.invalid': 'submission_schedule contains an out-of-range value'
  });

const inspectionScheduleFields = {
  inspection: objectId().required(),
  fleet: objectId().required(),
  frequency: Joi.string().valid(...INSPECTION_SECHEDULE).required(),
  frequency_count: Joi.number().integer().min(0).default(0),
  submission_schedule: submissionSchedule.required(),
  status: Joi.string().valid(...INSPECTION_SECHEDULE_STATUS).default('non-scheduled')
};

class InspectionScheduleSchema extends BaseSchema {
  constructor() {
    super(inspectionScheduleFields);
  }
}
module.exports = new InspectionScheduleSchema();
