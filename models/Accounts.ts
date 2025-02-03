import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Account interface
export interface Account extends Document {
  userId: mongoose.Types.ObjectId; // Reference to User
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: number;
  tokenType?: string;
  scope?: string;
  idToken?: string;
  sessionState?: string;
}

// Create the schema for the Account model
const AccountSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    expiresAt: {
      type: Number,
    },
    tokenType: {
      type: String,
    },
    scope: {
      type: String,
    },
    idToken: {
      type: String,
    },
    sessionState: {
      type: String,
    },
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

// Ensure the model is created only once (to avoid redefinition errors)
const AccountModel: Model<Account> =
  mongoose.models?.Account || mongoose.model<Account>("Account", AccountSchema);

export default AccountModel;
