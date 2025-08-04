const mongoose = require("mongoose");

const FuelSchema = new mongoose.Schema(
  {
    quality: { type: Number, default: 0 },
    primary_tank_capacity: { type: Number, default: 0 },
    secondary_tank_capacity: { type: Number, default: 0 },
    fuelEconomy: {
      epa_city: { type: Number, default: 0 },
      epa_highway: { type: Number, default: 0 },
      epa_combined: { type: Number, default: 0 },
    },
    oilCapacity:{ type:Number, default:0}
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Fuel", FuelSchema);
