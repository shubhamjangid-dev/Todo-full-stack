import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  userId: String,
  todoId: String,
  content: String,
});

export const Comment = mongoose.model("Comment", commentSchema);
