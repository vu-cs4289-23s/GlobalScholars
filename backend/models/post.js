import { Schema, model } from "mongoose";

const Post = new Schema({
  owner: { type: Schema.ObjectId, ref: "User", required: true },
  timestamp: { type: Date },
  content: { type: String, default: "" },
  tags: [{
    type: String,
    required: true,
    enum: [],   // TODO
  }],
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },

  // required to link to either a program or a location ?
  location: { type: Schema.ObjectId, ref: "Location" },
  program: { type: Schema.ObjectId, ref: "Program" },
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