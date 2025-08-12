const mongoose = require('mongoose');
const GenericModel = require('./generic.model'); 

const losSchema = new GenericModel().schema; 

losSchema.add({
  profileImageURL: {
    type: String,
    required: false,
    default: '',
  },
});

const LOS = mongoose.model('LOS', losSchema);

module.exports = LOS;
