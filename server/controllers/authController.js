import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
// import { sendOtp } from "../utils/sendOtp.js";

export const addNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const saltRound = 12;
    const encryptPasswd = await bcrypt.hash(password, saltRound);
    const user = await User.create({
      name,
      email,
      password: encryptPasswd,
      // otp,
      // otpExpire: Date.now() + 5 * 60 * 1000,
    });
    // await sendOtp(email, otp);
    // res.json({ message: "OTP send to email" });
    const token = generateToken(user._id);
    res.status(200).json({ user: user.name, token });
  } catch (err) {
    res.status(500).json({ message: "Something wrong" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not exists" });
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = generateToken(user._id);
        res.status(200).json({ user: user.name, token });
      } else {
        res.status(500).json({ mesage: "password not match" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something wrong" });
  }
};
