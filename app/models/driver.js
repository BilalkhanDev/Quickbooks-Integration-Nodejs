// models/Driver.js
const mongoose = require("mongoose");
const validator = require("validator");
const { search, paginate } = require("./plugin");

const DriverSchema = new mongoose.Schema({
  
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  address: { type: String, required: true },
  zipcode: { type: String, required: true },
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
  serviceArea: { type: String, required: true },
  garageAddress: { type: String, required: true },
  fleet: { type: mongoose.Schema.Types.ObjectId, ref: "Fleet"},
  user:{type: mongoose.Schema.Types.ObjectId, ref: "User"}
});
DriverSchema.plugin(search);
DriverSchema.plugin(paginate)
module.exports = mongoose.model("Driver", DriverSchema);
