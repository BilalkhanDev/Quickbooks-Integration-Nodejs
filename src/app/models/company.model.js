const mongoose = require('mongoose');
const { search } = require('../../shared/plugin');


const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    
  }
}, {
  timestamps: true
});
CompanySchema.plugin(search);

module.exports = mongoose.model('Company', CompanySchema);
