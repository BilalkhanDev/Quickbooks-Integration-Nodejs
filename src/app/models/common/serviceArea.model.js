const mongoose = require('mongoose');
const GenericModel = require('./generic.model'); 

const serviceAreaSchema = new GenericModel().schema; 

serviceAreaSchema.add({
  zipCodes: [
    {
      type: [String],
    },
  ],
});

const ServiceArea = mongoose.model('ServiceArea', serviceAreaSchema);

module.exports = ServiceArea;
