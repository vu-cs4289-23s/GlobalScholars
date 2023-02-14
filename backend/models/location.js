import { Schema, model } from "mongoose";

const Location = new Schema({
  city: { type: String },
  country: { type: String },
  description: { type: String },
});

export default model("Location", Location);