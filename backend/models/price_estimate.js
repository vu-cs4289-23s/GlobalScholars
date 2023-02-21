import { Schema, model } from "mongoose";

// web scraped GEO data
const PriceEstimate = new Schema({
  program: { type: Schema.ObjectId, ref: "Program", required: true },
  semester: {
    type: String,
    default: "",
    enum: ["Fall", "Spring", "Summer", "Maymester"]
  },
  year: { type: Date },

  // program price
  tuition_fee: { type: Number, default: 0 },
  program_fee: { type: Number, default: 0 },
  administrative_fee: { type: Number, default: 0 },
  total_program_cost: { type: Number, default: 0 },   // sum of program

  // out of pocket price
  meals: { type: Number, default: 0 },
  housing: { type: Number, default: 0 },
  residence_fee: { type: Number, default: 0 },
  books: { type: Number, default: 0 },
  transportation: { type: Number, default: 0 },
  personal_expenses: { type: Number, default: 0 },
  airfare: { type: Number, default: 0 },
  total_out_of_pocket_cost: { type: Number, default: 0 },  // sum of out of pocket

  total_estimated_cost: { type: Number, default: 0 },   // total_program_cost + total_out_of_pocket
  vandy_tuition_diff: { type: Number, default: 0 },
});

export default model("PriceEstimate", PriceEstimate);