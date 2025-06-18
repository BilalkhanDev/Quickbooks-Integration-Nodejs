const Joi = require('joi');
const { FLEET_STATUS } = require('../constants/role');
const { mongoose } = require('mongoose');

// Register Schema
const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username can be up to 30 characters long',
      'string.empty': 'Username is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.empty': 'Password is required',
    }),

  confirmPassword: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Confirm password must be at least 6 characters long',
      'string.empty': 'Confirm password is required',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email address',
      'string.empty': 'Email is required',
    }),

})
  .custom((value, helper) => {
    if (value.password !== value.confirmPassword) {
      return helper.message("Passwords don't match");
    }
    return value;
  });

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email address',
      'string.empty': 'Email is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.empty': 'Password is required',
    }),


})


// user data
const userSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1',
      'any.required': 'Page is required',
    }),

  limit: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'any.required': 'Limit is required',
    }),
});
const singleUserSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.empty': 'User ID is required',
      'any.required': 'User ID is required',
    }),
});

const objectId = Joi.string()
  .length(24)
  .hex()
  .required()
  .messages({
    'string.length': 'ID must be exactly 24 characters long',
    'string.hex': 'ID must be a valid hexadecimal string',
    'any.required': 'ID is required',
  });

const generiIdSchema = Joi.object({
  id: objectId,
});
const genericfleetIdSchema=Joi.object({
  fleetId: objectId,
});
const createFleetSchema = Joi.object({
  plate_number: Joi.string().required().messages({
    'string.empty': 'Plate number is required',
    'any.required': 'Plate number is required'
  }),
  make: Joi.string().required().messages({
    'string.empty': 'Make is required',
    'any.required': 'Make is required'
  }),
  model: Joi.string().required().messages({
    'string.empty': 'Model is required',
    'any.required': 'Model is required'
  }),
  color: Joi.string().required().messages({
    'string.empty': 'Color is required',
    'any.required': 'Color is required'
  }),
  year: Joi.number().required().messages({
    'number.base': 'Year must be a number',
    'any.required': 'Year is required'
  }),
  odometer: Joi.number().required().messages({
    'number.base': 'Odometer must be a number',
    'any.required': 'Odometer is required'
  }),
  assigned_driver: objectId.allow(null, ''),
  status: Joi.number().valid(...Object.values(FLEET_STATUS)).default(FLEET_STATUS.ACTIVE),
  insurance_expiry: Joi.date().allow(null, ''),
  service_due_date: Joi.date().allow(null, ''),
});

const updateFleetSchema = Joi.object({
  plate_number: Joi.string(),
  make: Joi.string(),
  model: Joi.string(),
  color: Joi.string(),
  year: Joi.number(),
  odometer: Joi.number(),
  assigned_driver: objectId.allow(null, ''),
  status: Joi.number().valid(...Object.values(FLEET_STATUS)).default(FLEET_STATUS.ACTIVE),
  insurance_expiry: Joi.date().allow(null, ''),
  service_due_date: Joi.date().allow(null, ''),
});

const fleetIdSchema = Joi.object({
  id: objectId.required().messages({
    'string.base': 'Fleet ID must be a string',
    'any.required': 'Fleet ID is required',
    'any.invalid': 'Invalid Fleet ID format'
  })
});
const getfleetSpecfSchema = Joi.object({
  fleetId: objectId.required().messages({
    'string.base': 'Fleet ID must be a string',
    'any.required': 'Fleet ID is required',
    'any.invalid': 'Invalid Fleet ID format'
  })
});
const createFleetStatusSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
  }),
  color: Joi.string().required().messages({
    'string.base': 'Color must be a string',
    'any.required': 'Color is required',
  }),
  isDefault: Joi.boolean().default(false),
  isRemovaAble: Joi.boolean().default(true),
  usage: Joi.number().default(0)
});

// 2️⃣ Update Schema
const updateFleetStatusSchema = Joi.object({
  name: Joi.string(),
  color: Joi.string(),
  isDefault: Joi.boolean(),
  isRemovaAble: Joi.boolean(),
  usage: Joi.number()
});

// 3️⃣ Single ID param
const fleetStatusIdSchema = Joi.object({
  id: Joi.required().messages({
    'string.base': 'ID must be a string',
    'any.required': 'ID is required',
    'any.invalid': 'Invalid ID format'
  })
});

// 4️⃣ Bulk delete: array of objectIds
const bulkDeleteFleetStatusSchema = Joi.array()
  .items(objectId.required())
  .min(1)
  .required()
  .messages({
    'array.base': 'Body must be an array of MongoDB ObjectIds',
    'array.min': 'At least one ID is required',
    'any.required': 'IDs array is required'
  });
const createFleetTypeSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
  }),
  isDefault: Joi.boolean().default(false),
  isRemoveAble: Joi.boolean().default(true)
});

const updateFleetTypeSchema = Joi.object({
  name: Joi.string(),
  isDefault: Joi.boolean(),
  isRemoveAble: Joi.boolean()
});

const fleetTypeIdSchema = Joi.object({
  id: objectId.required().messages({
    'string.base': 'ID must be a string',
    'any.required': 'ID is required',
    'any.invalid': 'Invalid ID format'
  })
});
const fleetServiceIdSchema = Joi.object({
  fleetId: objectId.required().messages({
    'string.base': 'ID must be a string',
    'any.required': 'ID is required',
    'any.invalid': 'Invalid ID format'
  })
});

const bulkDeleteFleetTypeSchema = Joi.array()
  .items(objectId)
  .min(1)
  .required()
  .messages({
    'array.base': 'Body must be an array of MongoDB ObjectIds',
    'array.min': 'At least one ID is required',
    'any.required': 'IDs array is required'
  });
const createExpenseSchema = Joi.object({
  name: Joi.string().required(),
  usage: Joi.number().default(0)
});

const updateExpenseSchema = Joi.object({
  name: Joi.string(),
  usage: Joi.number()
});

const expenseIdSchema = Joi.object({
  id: objectId,
});
const fuelTypeSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.base': 'Name must be a string'
  }),
  usage: Joi.number().optional(),
  fuelUsage: Joi.number().optional()
});
const fuelTypeUpdateSchema = Joi.object({
  name: Joi.string().messages({
    'any.required': 'Name is required',
    'string.base': 'Name must be a string'
  }),
  usage: Joi.number().optional(),
  fuelUsage: Joi.number().optional()
});
const vendorSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.number().valid(0, 1).optional(),
  phone: Joi.number().optional(),
  website: Joi.string().optional(),
  labels: Joi.array().items(Joi.string()).optional(),
  address: Joi.string().optional(),
  subAddrress: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zip: Joi.string().optional(),
  contactName: Joi.string().optional(),
  contactPhone: Joi.number().optional(),
  email: Joi.string().email().optional(),
  classification: Joi.number().valid(0, 1, 2, 3, 4, 5).required().default(0),
  archived: Joi.boolean().optional()
});
const vendorUpdateSchema = Joi.object({
  name: Joi.string(),
  status: Joi.number().valid(0, 1).optional(),
  phone: Joi.number().optional(),
  website: Joi.string().optional(),
  labels: Joi.array().items(Joi.string()).optional(),
  address: Joi.string().optional(),
  subAddrress: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zip: Joi.string().optional(),
  contactName: Joi.string().optional(),
  contactPhone: Joi.number().optional(),
  email: Joi.string().email().optional(),
  classification: Joi.number().valid(0, 1, 2, 3, 4, 5).optional().default(0),
  archived: Joi.boolean().optional()
});

const updateFleetSpecSchema = Joi.object({
  engine: Joi.object().optional(),
  wheel: Joi.object().optional(),
  transmission: Joi.object().optional(),
  weight: Joi.object().optional(),
  fuelEconomy: Joi.object().optional()
});
const issueCreateSchema = Joi.object({
  fleetId:Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'any.required': 'ID is required',
    'any.invalid': 'Invalid ID format'
  }),
  serviceId:Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'any.required': 'ID is required',
    'any.invalid': 'Invalid ID format'
  }),
  priority: Joi.number().valid(0, 1, 2, 3, 4).default(0),
  reportedDate: Joi.date().required(),
  summary: Joi.string().required(),
  description: Joi.string().optional(),
  labels: Joi.number().valid(0, 1, 2, 3).optional(),
  primaryMeter: Joi.number().optional(),
  void: Joi.boolean().default(false),
  reportedBy: Joi.string().required(),
  assignedTo: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  primaryMeterDue: Joi.number().optional(),
  photos: Joi.array().items(Joi.string()).optional(),
  documents: Joi.array().items(Joi.string()).optional(),
});

// Schema to validate the issue ID in the URL
const issueIdSchema = Joi.object({
  issueId: Joi.string().required(),
});

// Schema to validate service ID in the URL
const serviceIdSchema = Joi.object({
  serviceId: Joi.string().required(),
});

// Schema to validate issue update data
const issueUpdateSchema = Joi.object({
  priority: Joi.number().valid(0, 1, 2, 3, 4).optional(),
  summary: Joi.string().optional(),
  description: Joi.string().optional(),
  labels: Joi.number().valid(0, 1, 2, 3).optional(),
  assignedTo: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  photos: Joi.array().items(Joi.string()).optional(),
  documents: Joi.array().items(Joi.string()).optional(),
});

const updateServiceEntrySchema = Joi.object({
  repairPriorityClass: Joi.string().valid('0', '1', '2').optional(),
  odometer: Joi.number().optional(),
  void: Joi.boolean().optional(),
  completionDate: Joi.date().optional(),
  isStartDate: Joi.boolean().optional(),
  startDate: Joi.date().optional(),
  vendor: Joi.string().optional(),
  reference: Joi.string().optional(),
  labels: Joi.number().valid(0, 1, 2, 3).optional(),
  issues: Joi.string().optional(),
  photos: Joi.array().items(Joi.string()).optional(),
  documents: Joi.array().items(Joi.string()).optional(),
  comments: Joi.string().optional(),
});

const inspectionSubmissionSchema = Joi.object({
  inspectionId: objectId.required(),
  fleetId: objectId.required(),
  inspectedBy: Joi.object({
    userId: objectId.required(),
    name: Joi.string().allow('').optional(),
    email: Joi.string().email().allow('').optional()
  }).required(),
  inspectionDate: Joi.date().optional(),
  itemValues: Joi.array().items(
    Joi.object({
      itemId: Joi.string().required(),
      value: Joi.any().optional()
    })
  ).required(),
  status: Joi.number().valid(0, 1).optional()
});
const getInspectionSubmissionSchema = Joi.object({
  inspectionId: objectId.required(),
  fleetId: objectId.required(),
});

const createInspectionSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  sections: Joi.array().items(
    Joi.object({
      sectionId: Joi.string().required(),
      name: Joi.string().required(),
      order: Joi.number().required(),
      parentSectionId: Joi.string().allow(null).optional(),
      _id: Joi.any().optional()
    })
  ).optional(),
  items: Joi.array().items(
    Joi.object({
      itemId: Joi.string().required(),
      name: Joi.string().required(),
      type: Joi.string().valid('text', 'number', 'checkbox', 'dropdown', 'date', 'photo', 'signature', 'meter').required(),
      value: Joi.any().optional(),
      sectionId: Joi.string().allow(null).optional(),
      order: Joi.number().required(),
      required: Joi.boolean().optional(),
      options: Joi.any().optional(),
      _id: Joi.any().optional()
    })
  ).optional(),
  status: Joi.number().valid(0, 1).optional()
});

module.exports = {
  generiIdSchema,
  genericfleetIdSchema,
  registerSchema,
  loginSchema,
  userSchema,
  singleUserSchema,
  createFleetSchema,
  updateFleetSchema,
  fleetIdSchema,
  createFleetStatusSchema,
  updateFleetStatusSchema,
  fleetStatusIdSchema,
  updateServiceEntrySchema,
  bulkDeleteFleetStatusSchema,
  createFleetTypeSchema,
  updateFleetTypeSchema,
  fleetTypeIdSchema,
  fleetServiceIdSchema,
  bulkDeleteFleetTypeSchema,
  createExpenseSchema,
  updateExpenseSchema,
  expenseIdSchema,
  fuelTypeSchema,
  fuelTypeUpdateSchema,
  vendorSchema,
  vendorUpdateSchema,
  updateFleetSpecSchema,
  getfleetSpecfSchema,
  issueCreateSchema,
  issueIdSchema,
  serviceIdSchema,
  issueUpdateSchema,
  inspectionSubmissionSchema,
  getInspectionSubmissionSchema,
  createInspectionSchema,
};
