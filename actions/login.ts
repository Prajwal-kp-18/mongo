"use server";
import * as z from "zod";
import { LoginSchema } from "../schemas";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../data/user";
import connectMongoDB from "@/lib/dbConnect";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  await connectMongoDB(); // Ensure the database is connected
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "Email does not exist!" };
    }

    if (!existingUser.password) {
      return { error: "No password found for this user." };
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return { error: "Invalid credentials" };
    }

    // Proceed with signIn if credentials are valid
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Logged in successfully" };
  } catch (error) {
    console.error("Login error:", error);

    // Handle specific AuthError types from next-auth
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    // General error fallback
    return { error: "An error occurred, please try again." };
  }
};
