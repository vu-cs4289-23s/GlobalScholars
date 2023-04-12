import { Schema, model } from 'mongoose';

const Location = new Schema({
  // Scraped data
  city: { type: String, index: { unique: true }, required: true },
  country: { type: String },
  description: { type: String },
  programs: [{ type: Schema.ObjectId, ref: 'Program' }],
  like_cnt: { type: Number, default: 0 },

  // Forum data
  avg_overall_rating: { type: Number, default: 0 },
  avg_affordability_rating: { type: Number, default: 0 },
  top_tags: [{ type: String }],
  image_link: { type: String },
  // Trip data
  trips: [{ type: Schema.ObjectId, ref: 'Trip', default: [] }],

  // coordinates
  latitude: { type: Number, default: 0 },
  longitude: { type: Number, default: 0 },
});

export default model('Location', Location);
