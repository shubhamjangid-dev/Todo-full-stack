import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
  },
  discription: {
    type: String,
  },
  duedate: {
    type: Date,
  },
  priority: {
    type: Number,
  },
  status: {
    type: String,
  },
  asignedTo: {
    type: String,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
