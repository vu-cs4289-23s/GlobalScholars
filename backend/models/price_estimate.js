import { Schema, model } from "mongoose";

const PriceEstimate = new Schema({
  program: { type: Schema.ObjectId, ref: "Program", required: true },
  semester: {
    type: String,
    default: "",
    enum: ["Fall", "Spring", "Summer", "Maymester"]
  },
  year: { type: Date },
  total_cost: { type: Number, default: 0 },
  vanderbilt_tuition_difference: { type: Number, default: 0 },

  // program fees
  tuition_fee: { type: Number, default: 0 },
  program_fee: { type: Number, default: 0 },
  administrative_fee: { type: Number, default: 0 },
  total_vanderbilt_fee: { type: Number, default: 0 },
  total_program: { type: Number, default: 0 },

  // out of pocket fees
  meal_estimate: { type: Number, default: 0 },
  housing: { type: Number, default: 0 },
  residence_fee: { type: Number, default: 0 },
  books: { type: Number, default: 0 },
  transportation: { type: Number, default: 0 },
  personal_expenses: { type: Number, default: 0 },
  airfare: { type: Number, default: 0 },
  total_out_of_pocket: { type: Number, default: 0 },
});

export default model("PriceEstimate", PriceEstimate);