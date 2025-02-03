import mongoose, { Document, Schema, Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define the User interface
export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  emailVerified: Date;
  accounts: mongoose.Types.ObjectId[]; // Add accounts field as an array of ObjectIds
}

// Create the schema for the User model
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    email: {
      type: String,
      unique: true, // Ensure unique email
      required: true, // Email is required
    },
    password: {
      type: String,
      required: true, // Password is required
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"], // Restrict to specific roles
      default: "USER", // Default role
    },
    emailVerified: {
      type: Date,
    },
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to Account model
        ref: "Account",
      },
    ],
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

// Ensure the model is created only once (to avoid redefinition errors)
const UserModel: Model<User> =
  mongoose.models?.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
