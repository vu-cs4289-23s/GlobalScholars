import { Schema, model } from "mongoose";

const Program = new Schema({
  // Scraped data
  program_name: { type: String, index: { unique: true }, required: true},
  geo_link: { type: String },
  location: [{ type: Schema.ObjectId, ref: "Location" }], //for city and country data
  budget: { type: Schema.ObjectId, ref: "PriceEstimate" },
  budget_last_update: { type: String },
  terms: [{
    type: String,
    default: "",
    enum: ["Fall", "Spring", "Full Academic Year", "Maymester", "Summer"],
  }],
  restrictions: { type: String },
  type: { type: String },
  calendar: { type: String },
  housing: { type: String },
  min_gpa: { type: Number },
  language_of_instruction: { type: String },
  language_prerequisite: { type: String },
  additional_prerequisite: { type: String },
  image_link: { type: String },
  program_link: { type: String },

  // Forum data
  overall_rating: { type: Number, default: 0 },
  safety_rating: { type: Number, default: 0 },
  affordability_rating: { type: Number, default: 0 },
  sightseeing_rating: { type: Number, default: 0 },
  top_tags: [{ type: String }],
});

export default model("Program", Program);