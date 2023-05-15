const mongoose = require("mongoose");

const calcSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    calc: { type: String, required: true },
    result: { type: String, required: true },
  },
  { timestamps: true }
);

const Calculation = mongoose.model("Calculation", calcSchema);
module.exports = Calculation;
