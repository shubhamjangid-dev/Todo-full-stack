import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    groupname: {
      type: String,
    },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projectArray: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    invitelink: {
      type: String,
    },
    acceptInviteThroughLink: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Group = mongoose.model("Group", groupSchema);
