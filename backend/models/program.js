import { Schema, model } from "mongoose";

const Program = new Schema({
  location: { type: Schema.ObjectId, ref: "Location", required: true },
  program_name: { type: String },
  majors: [{
    type: String,
    default: "",
    enum: [],   // TODO
  }],
  semesters: [{
    type: String,
    default: "",
    enum: ["Fall", "Spring", "Summer", "Year", "Maymester"],
  }],
  courses: [{
    type: String,
    default: "",
    enum: [],   // TODO
  }],
  like_cnt: { type: Number, default: 0 },
});

export default model("Program", Program);