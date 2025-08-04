const mongoose = require('mongoose');

const FleetSpecSchema = new mongoose.Schema({
  fleetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fleet',
    required: true,
  },
  engine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Engine',
    default:null
  },
  wheel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wheel',
    default:null
  },
  transmission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transmission',
    default:null
  },
  weight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Weight',
    default:null
  },
  fuel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fuel',
    default:null
  },
  performance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Performance',
    default:null
  },
  dimension:{
     type: mongoose.Schema.Types.ObjectId,
    ref: 'Dimension',
    default:null
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('FleetSpec', FleetSpecSchema);
