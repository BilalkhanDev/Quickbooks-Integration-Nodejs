const mongoose = require('mongoose');
const validator = require('validator');

const VendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        enum: {
            values: [0, 1],
            message: 'Status Must be 0 or 1'
        },
        default: 0
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
    address: {
        type: String,
        default: null
    },
    subAddrress: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    zip: {
        type: String,
        default: null
    },
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
                // Only validate if email is not null
                return value === null || validator.isEmail(value);
            },
            message: 'Invalid email format'
        }
    },
    classification: {
        type: Number,
        enum: {
            values: [0, 1, 2, 3, 4, 5],
            //all,assest, charging, fuel,service, tools
            message: 'Classification must be 0, 1, 2,3,4 or 5'
        }
        , default: 0
    },
    archived: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Vendor', VendorSchema);
