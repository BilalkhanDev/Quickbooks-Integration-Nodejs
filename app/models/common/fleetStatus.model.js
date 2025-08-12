const mongoose = require('mongoose');

const FleetStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    
  },
  usage: {
    type: Number,
    default: 0
  },
  color:{
    type:String,
    default:null

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

module.exports = mongoose.model('FleetStatus', FleetStatusSchema);
