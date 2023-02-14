import { Schema, model } from "mongoose";

const Location = new Schema({
  city: { type: String },
  country: { type: String },
  description: { type: String },
  programs: [ { type: Schema.ObjectId, ref: "Program" } ],
  like_cnt: { type: Number, default: 0 },
});

export default model("Location", Location);