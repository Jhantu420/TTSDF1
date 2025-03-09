import adminModel from "../model/adminModel.js";
import bcrypt from "bcryptjs";
import userModel from "../model/userModel.js";

const unifiedVerifyOTPHelper = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    let user = await adminModel.findOne({ email }) || await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Already verified" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      await (user instanceof adminModel ? adminModel : userModel).deleteOne({ email });
      return res.status(400).json({ message: "OTP expired, please register again" });
    }

    const isMatch = await bcrypt.compare(otp, user.verifyOtp);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {unifiedVerifyOTPHelper};