const mongoose = require('mongoose');
const validator = require('validator');
const { search, paginate } = require('../../shared/plugin');

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coords: { type: [Number], default: [0, 0] },
  city: { type: String },
  state: { type: String },
});
const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        default: null
    },
    website: {
        type: String,
        default: null
    },
    labels: [{
        type: String,
        default: null
    }],
    address:addressSchema,
    contactName: {
        type: String,
        default: null
    },
    contactPhone: {
        type: Number,
        default: null
    },
    email: {
        type: String,
        default: null,
        validate: {
            validator: function (value) {
             return value === null || validator.isEmail(value);
            },
            message: 'Invalid email format'
        }
    },
    classification: {
        type: [String],// 'charging,fuel,service,asset'
        default: []
    },
    archived: {
        type: Boolean,
        default: false
    },
    isActive:{
        type:Boolean,
        default:true
    }
}, {
    timestamps: true
});

VendorSchema.statics.isTitleTaken= async function(name, excludeId) {
      const result = await this.findOne({ 
        name, 
        _id: { $ne: excludeId } 
      });
      return !!result;
    };
VendorSchema.plugin(search)
VendorSchema.plugin(paginate)
module.exports = mongoose.model('Vendor', VendorSchema);
