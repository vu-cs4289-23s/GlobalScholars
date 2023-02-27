import { Schema, model } from "mongoose";

const Location = new Schema({
  // Scraped data
  city: { type: String, index: { unique: true }, required: true},
  country: { type: String },
  description: { type: String },
  programs: [ { type: Schema.ObjectId, ref: "Program" } ],
  like_cnt: { type: Number, default: 0 },

  // Forum data
  star_rating: { type: Number, default: 0 },
  top_tags: [{ type: String }],
});

export default model("Location", Location);