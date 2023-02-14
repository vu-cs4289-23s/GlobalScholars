import { Schema, model } from "mongoose";

const Program = new Schema({
  program_name: { type: String },
  majors: [{
    type: String,
    default: "",
    enum: [],
  }],
  courses: [{
    type: String,
    default: "",
    enum: [],
  }],
  location: { type: Schema.ObjectId, ref: "Location" },
});

export default model("Program", Program);