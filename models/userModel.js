const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w",
    },
    role: {
      type: String,
      default: "user",
    },
    gender: {
      type: String,
      default: "male",
    },
    gitId:{
      type: String,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    story: { type: String, default: "", maxlength: 200 },
    website: { type: String, default: "" },
    followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    followings: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
