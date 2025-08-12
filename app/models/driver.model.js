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
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  license: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  contactNumber: { type: String, required: true },
  serviceArea: {type: mongoose.Schema.Types.ObjectId, ref: "ServiceArea" },
  garageAddress: { type: String, required: true },
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
