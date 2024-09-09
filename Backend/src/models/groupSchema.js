import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    groupname: {
      type: String,
    },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projectArray: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
  }
);

export const Group = mongoose.model("Group", groupSchema);
