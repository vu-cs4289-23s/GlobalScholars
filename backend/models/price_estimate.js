import { Schema, model } from "mongoose";

// web scraped GEO data
const PriceEstimate = new Schema({
   program: { type: Schema.ObjectId, ref: "Program", required: true },

  // Scraped data
  total_budget: { type: Number },
  budget_last_updated: { type: String },
  admin_fee: { type: Number },
  airfare: { type: Number },
  books_supplies: { type: Number },
  housing: { type: Number },
  local_transportation: { type: Number },
  meals: { type: Number },
  personal_expenses: { type: Number },
  program_fee: { type: Number },
  total_out_of_pocket_cost: { type: Number },
  total_vanderbilt_cost: { type: Number },
  tuition_cost: { type: Number },
  visa_residence_fee: { type: Number },
});

export default model("PriceEstimate", PriceEstimate);