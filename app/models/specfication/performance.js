const mongoose = require("mongoose");

const PerformanceSchema = new mongoose.Schema(
  {
    towingCapacity: { type: Number, default: 0 },
    maxPayload: { type: Number, default: 0 },
   
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Performance", PerformanceSchema);
