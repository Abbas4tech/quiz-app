"use server";

import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import dbConnect from "@/db/connection";
import UserModel from "@/model/User";
import { PERMISSIONS } from "@/types/permissions";

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
    // console.log(existingUser);
    if (existingUser) {
      user._id = existingUser._id.toString();
      user.role = existingUser.role;
      user.permissions = existingUser.permissions;
    } else {
      const newUser = new UserModel({
        email: user.email,
        name: user.email?.split("@")[0],
        profilePhoto: user.image,
        role: "admin",
        permissions: [
          PERMISSIONS._READ,
          PERMISSIONS._WRITE,
          PERMISSIONS._UPDATE,
          PERMISSIONS._DELETE,
        ],
      });
      const res = await newUser.save();
      // console.log(res);
      user._id = res._id.toString();
      user.role = res.role;
      user.permissions = res.permissions;
    }
    return true;
  } catch (er) {
    console.error("Error occured in loggin in :", er);
    return false;
  }
};

export default verifyGoogleSignIn;
