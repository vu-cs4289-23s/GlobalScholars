import { Schema, model } from "mongoose";

const Program = new Schema({
  location: [{ type: Schema.ObjectId, ref: "Location", required: true }],
  program_name: { type: String },
  description: { type: String },
  majors: [{ type: String, default: "", }],   // not able to scrape
  semesters: [{
    type: String,
    default: "",
    enum: ["Fall", "Spring", "Summer", "Maymester"],
  }],
  courses: [{ type: String, default: "" }],
  estimated_budget: [{ type: Schema.ObjectId, ref: "PriceEstimate" }],
  prerequisites: [{ type: String, default: "" }],
  language: [{ type: String, default: "" }],
  like_cnt: { type: Number, default: 0 },
});

export default model("Program", Program);