import { Schema, model } from "mongoose";
import crypto from "crypto";
const makeSalt = () => Math.round(new Date().valueOf() * Math.random()) + "";

const encryptPassword = (salt, password) =>
  crypto.createHmac("sha512", salt).update(password).digest("hex");

const reservedNames = ["password"];

const User = new Schema({
  // registration information
  username: { type: String, required: true, index: { unique: true } },
  primary_email: { type: String, required: true, index: { unique: true } },
  first_name: { type: String, default: "" },
  last_name: { type: String, default: "" },
  hash: { type: String, required: true },
  salt: { type: String, required: true },

  // profile information
  avatar_url: { type: String, default: "" },
  background_url: { type: String, default: "" },
  city: { type: String, default: "" },
  program: { type: Schema.Types.ObjectId, ref: "Program" },
  majors: [{ type: String, default: "" }],
  minors: [{ type: String, default: "" }],
  grad_year: { type: Date },
  bio: { type: String, default: "" },

  // post interactions
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  saves: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

User.path("username").validate(function (value) {
  if (!value) return false;
  if (reservedNames.indexOf(value) !== -1) return false;
  return (
    value.length > 5 && value.length <= 16 && /^[a-zA-Z0-9]+$/i.test(value)
  );
}, "invalid username");

User.path("primary_email").validate(function (value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}, "malformed address");

User.virtual("password").set(function (password) {
  this.salt = makeSalt();
  this.hash = encryptPassword(this.salt, password);
});

User.method("authenticate", function (plainText) {
  return encryptPassword(this.salt, plainText) === this.hash;
});

User.pre("save", function (next) {
  // Sanitize strings
  this.username = this.username.toLowerCase();
  this.primary_email = this.primary_email.toLowerCase();
  this.first_name = this.first_name.replace(/<(?:.|\n)*?>/gm, "");
  this.last_name = this.last_name.replace(/<(?:.|\n)*?>/gm, "");
  next();
});

export default model("User", User);
