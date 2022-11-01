const mongoose = require("mongoose");
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments:[{type: new mongoose.Schema({
      user: { type: ObjectId},  
      comment: { type: String}},{timestamps: true})}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
