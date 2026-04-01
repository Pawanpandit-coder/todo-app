import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    // isVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    // otp: String,
    // otpExpire: Date,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
