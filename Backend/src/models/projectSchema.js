import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    projectname: {
      type: String,
      required: true,
    },
    todoArray: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
