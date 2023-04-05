import { Schema, model } from 'mongoose';

const Trip = new Schema({
  title: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },

  saves: [
    {
      type: Schema.ObjectId,
      ref: 'User',
    },
  ],
  location: { type: Schema.ObjectId, ref: 'Location' },
  cheapest_month: { type: [String], default: [] },

  cost_by_month: { type: [String], default: [] },
});

export default model('Trip', Trip);
