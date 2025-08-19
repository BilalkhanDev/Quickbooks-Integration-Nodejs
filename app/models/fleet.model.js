const mongoose = require('mongoose');
const { FLEET_STATUS } = require('../shared/constants/enum');
const { paginate, search } = require('../shared/plugin');

const FleetSchema = new mongoose.Schema({
  user:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  setiDecall: {
    type: String,
    required: true
  },
  serviceAreas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'ServiceArea',
    required: true
  }],
  los: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'LOS',
    required: true
  },
  spaceType: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'SpaceType',
    required: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FleetType', 
    required: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', 
    required: true,
  },
  bodyType: {
    type: String,
    enum: ['Full-Cut', 'Half-Cut'],
    default: 'Full-Cut',
    required: true
  },
  capacity: {
    type: String,
    required: true
  },
  equipments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Equipment',
    required: true
  }],
  fundingSources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fundingsource', 
    required: true
  }],
  vin: {
    type: String,
    required: true
  },
  gasCardNumber: {
    type: String,
    required: true
  },
  driverCarYear: {
    type: String,
    required: true
  },
  driverCarNumber: {
    type: String,
    required: true
  },
  driverCarColor: {
    type: String,
    required: true
  },
  driverCarModel: {
    type: String,
    required: true
  },
  realOdometer: {
    type: String,
    required: true
  },
  limitation: {
    type: String
  },
  notes: {
    type: String
  },
  assigned_driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    default:null
  },
  fuelType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FuelType', 
    required: true
  },
  status: {
    type: String,
    enum: FLEET_STATUS,
    default: FLEET_STATUS[0]
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Attach plugins
FleetSchema.plugin(paginate);
FleetSchema.plugin(search, {
  refFields: {
    fuelType:['name'],
    group: ['name'],
    assigned_driver:['email'],
    fundingSources:['title'],
    los:['title'],
    assigned_driver:['firstName','lastName','email'],
    spaceType:['title'],
    serviceAreas:['title'],
    type:['name'],
   

}    
  });

module.exports = mongoose.model('Fleet', FleetSchema);
