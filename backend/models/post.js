import { Schema, model } from "mongoose";

const Post = new Schema({
  owner: { type: Schema.ObjectId, ref: "User", required: true },
  timestamp: { type: Date },
  content: { type: String, default: "" },
  // hardcode tags below
  tags: [{
    type: String,
    required: true,
    enum: ["klondike", "pyramid", "canfield", "golf", "yukon", "hearts"]
  }],
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  saves: { type: Number, default: 0 },

  // required to link to either a program or a location ?
  location: { type: Schema.ObjectId, ref: "Location" },
  program: { type: Schema.ObjectId, ref: "Program" },
});

export default model("Post", Post);