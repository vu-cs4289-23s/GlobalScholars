import { Schema, model } from "mongoose";

const Comment = new Schema({
  owner: { type: Schema.ObjectId, ref: "Post", required: true },
  timestamp: { type: Date },
  content: { type: String, default: "" },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },
});

Comment.pre("validate", function(next) {
  this.timestamp = Date.now();
  next();
});

export default model("Comment", Comment);