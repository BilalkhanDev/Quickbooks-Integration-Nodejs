// models/Driver.js
const mongoose = require("mongoose");
const validator = require("validator");
const { search, paginate } = require("../shared/plugin");

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coords: { type: [Number], default: [0, 0] },
  city: { type: String },
  state: { type: String },
});

const DriverSchema = new mongoose.Schema({
  
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  address: addressSchema,
  garageAddress:addressSchema,
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  license: { type: String, required: true },
  email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,  // Email must remain unique
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value); // Validator function to check if the email is valid
        },
        message: 'Please fill a valid email address', // Error message if validation fails
      },
    },
  contactNumber: { type: String, required: true },
  serviceArea: [{type: mongoose.Schema.Types.ObjectId, ref: "ServiceArea" }],
  fleet: { type: mongoose.Schema.Types.ObjectId, ref: "Fleet"},
  user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  isActive:{
    type: Boolean,
    default:false
  }
},{timestamps:true});

DriverSchema.plugin(search);
DriverSchema.plugin(paginate)
module.exports = mongoose.model("Driver", DriverSchema);
