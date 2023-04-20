import { Schema, model } from 'mongoose';

const Trip = new Schema({
  owner: { type: Schema.ObjectId, ref: 'User', required: true },
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  location: { type: Schema.ObjectId, ref: 'Location', required: true },
  post: { type: Schema.ObjectId, ref: 'Post', required: true },
  city: { type: String, default: '' },
  country: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  overall_rating: { type: Number, default: 0 },
  affordability_rating: { type: Number, default: 0 },

  saves: [
    {
      type: Schema.ObjectId,
      ref: 'User',
    },
  ],
  start_date: { type: Number },
  end_date: { type: Number },
});

export default model('Trip', Trip);
