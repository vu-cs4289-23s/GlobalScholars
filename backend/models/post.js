import { Schema, model } from "mongoose";

const Post = new Schema({
  owner: { type: Schema.ObjectId, ref: "User", required: true },
  timestamp: { type: Date },
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  tags: [{
    type: String,
    required: true,
    enum: ['weekend-trip', 'day-trip', 'favorite-city', 'never-going-back', 'lots-of-history', 'great-hostels',
      'awesome-nightlife', 'beautiful-scenery', 'amazing-eats', 'overpriced', 'affordable', 'kinda-pricey', 'hold-onto-stuff',
      'not-safe-night', 'watch-for-scams', 'walkable', 'hard-toget-around', 'great-transit', 'university-housing',
      'host-family', 'no-housing-support', 'beautiful-campus', 'great-location', 'lots-homework', 'reading', 'many-papers',
      'group-projects', 'extra-credit', 'not-much-homework', 'tough-grading', 'test-heavy', 'lecture-heavy', 'pop-quizzes',
      'participation-matters', 'few-graded-things', 'classes-breeze']
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