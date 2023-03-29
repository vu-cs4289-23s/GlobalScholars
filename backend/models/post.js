import { Schema, model } from "mongoose";

const Post = new Schema({
  owner: { type: Schema.ObjectId, ref: "User", required: true },
  timestamp: { type: Date },
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  tags: [{
    type: String,
    required: true,
    enum: ['Weekend trip', 'Day trip', 'Favorite city', 'Never going back', 'Lots of history', 'Great hostels',
      'Awesome nightlife', 'Beautiful scenery', 'Amazing eats', 'Overpriced', 'Affordable', 'Kinda Pricey',
      'Hold onto your stuff!', 'Not safe at night', 'Watch for scams!', 'Walkable', 'Hard to get around',
      'Great public transit', 'University Housing', 'Host Family', 'No housing support', 'Beautiful campus',
      'Great location', 'Lots of homework', 'Get ready to read', 'So many papers', 'Group projects', 'Extra credit',
      'Not much homework', 'Tough grading', 'Test heavy', 'Lecture heavy', 'Beware of pop quizzes',
      'Participation matters', 'Graded by few things']
  }],
  likes: [{
    type: Schema.ObjectId,
    ref: "User" }],
  dislikes: [{
    type: Schema.ObjectId,
    ref: "User" }],
  saves: [{
    type: Schema.ObjectId,
    ref: "User" }],
  location: { type: Schema.ObjectId, ref: "Location" },
  program: { type: Schema.ObjectId, ref: "Program" },
  comments: [{ type: Schema.ObjectId, ref: "Comment" }]
});

Post.pre("validate", function(next) {
  this.timestamp = Date.now();
  next();
});

Post.pre("save", function(next) {
  // Sanitize strings
  this.content = this.content.replace(/<(?:.|\n)*?>/gm, "");
  next();
});

export default model("Post", Post);