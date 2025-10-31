"use server";

import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import dbConnect from "@/db/connection";
import UserModel from "@/model/User";

/**
 * Handles Google OAuth user verification and database operations
 * Creates new user if doesn't exist, otherwise updates existing
 *
 * @param user - NextAuth user object from Google provider
 * @returns {Promise<boolean>} Success status of the operation
 */
const verifyGoogleSignIn = async (
  user: User | AdapterUser
): Promise<boolean> => {
  try {
    await dbConnect();

    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
      user._id = existingUser._id.toString();
    } else {
      const newUser = new UserModel({
        email: user.email,
        name: user.name,
        profilePhoto: user.image,
      });
      const res = await newUser.save();
      user._id = res._id.toString();
    }
    return true;
  } catch (er) {
    console.error("Error occured in loggin in :", er);
    return false;
  }
};

export default verifyGoogleSignIn;
