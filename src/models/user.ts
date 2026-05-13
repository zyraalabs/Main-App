import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  emailVerified: boolean;
  isPremium: boolean;
  plan: string;
  trialUsed: boolean;
  usage: {
    totalBuilds: number;
    remainingTrial: number;
  };
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    emailVerified: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    plan: { type: String, default: "free" },
    trialUsed: { type: Boolean, default: false },
    usage: {
      totalBuilds: { type: Number, default: 0 },
      remainingTrial: { type: Number, default: 4 },
    },
  },
  { timestamps: true },
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
