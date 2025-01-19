import UserModel from "../models/User"; // Import the Mongoose User model

export const getUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email }).exec(); // Find user by email
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findById(id).exec(); // Find user by ID
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

export const updateEmailVerified = async (userId: string) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId, // Search by user ID
      { emailVerified: new Date() }, // Set the emailVerified field to the current date and time
      { new: true } // This option returns the updated document
    );

    if (!user) {
      throw new Error("User not found");
    }

    console.log("User email verification updated successfully:", user);
    return user; // Return the updated user document
  } catch (error) {
    console.error("Error updating email verification:", error);
    throw new Error("Could not update email verification");
  }
};
