"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import connectMongoDB from "../src/lib/dbConnect";
import UserModel from "../models/User";
import { RegisterSchema } from "../schemas";
import { getUserByEmail } from "../data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  await connectMongoDB(); // Ensure the database is connected

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists" };
  }

  try {
    // Create the user in the database
    await UserModel.create({
      email,
      password: hashedPassword,
      name,
    });

    return { success: "Account created successfully" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Something went wrong, please try again." };
  }
};
