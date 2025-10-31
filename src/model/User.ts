import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Base User Model that store in MongoDB database --> Update fields as per your needs
interface User extends Document {
  _id: Types.ObjectId;
  email: string;
  name: string;
  profilePhoto: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: [true, "Email is required to store in Database!"],
    },
    name: {
      type: String,
      required: [true, "Name is required to store in Database!"],
    },
    profilePhoto: {
      type: String,
      required: [true, "Profile photo is required to store in Database!"],
    },
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models.User as Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
