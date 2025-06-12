const mongoose = require('mongoose');

const FleetTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    
  },
  usage: {
    type: Number,
    default: 0
  },
  isRemoveAble:{
    type:Boolean,
    default:true
  },
  isDefault:{
    type:Boolean,
    default:false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('FleetType', FleetTypeSchema);
