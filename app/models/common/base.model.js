// generic.model.js 
const mongoose = require('mongoose'); 
const { paginate, search } = require('../../shared/plugin'); 

class GenericCommonModel { 
  constructor() { 
    this.schema = mongoose.Schema( 
      { 
        title: {
          type: String,
          required: true,
          unique: true,
          sparse: true,
          trim: true,
        }, 
        description: { 
          type: String, 
          trim: true, 
        }, 
        isActive: { 
          type: Boolean, 
          default: false, 
        }, 
      }, 
      { 
        timestamps: true, 
      } 
    ); 
    
    this.schema.plugin(paginate); 
    this.schema.plugin(search); 
  
    this.schema.statics.isTitleTaken = async function(title, excludeId) {
      const result = await this.findOne({ 
        title, 
        _id: { $ne: excludeId } 
      });
      return !!result;
    };
  } 
} 

module.exports = GenericCommonModel;