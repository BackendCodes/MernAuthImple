const userModel = require("../modules/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transport = require("../config/nodemailer");

// register controller
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // basic validation
  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "please fill all fields carefully",
    });
  }

  try {
    // user exists
    const existinguser = await userModel.findOne({ email: email });

    if (existinguser) {
      return res.json({
        success: false,
        message: "user already exists",
      });
    }

    //    hashing Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // creating User
    const createuser = await userModel.create({
      name,
      email,
      password: hash,
    });

    // generating token
    const token = jwt.sign({ id: createuser._id }, process.env.JWT_SECRET, {
      expiresIn: "180s",
    });

    // setting cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3 * 60 * 1000, // 3 minutes
    });

    const mailOptions = {
      from: process.env.APP_USER,
      to: email,
      subject: "Registration Successful",
      html: `<h3> Welcome ${name} to auth project </h3>`,
    };

    try {
      await transport.sendMail(mailOptions);
      console.log("✅ Registration email sent successfully!");
    } catch (error) {
      console.error("❌ Email sending failed:", error);
    }

    return res.json({
      success: true,
      message: "Email sent successfully",
      // data: createuser, // Uncomment when user creation is enabled
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err,
    });
  }
};

// log in controller
const login = async (req, res) => {
  const { email, password } = req.body;

  // basic validation
  if (!email || !password) {
    return res.json({
      success: false,
      message: "email and password required",
    });
  }

  try {
    // existing user
    const existinguser = await userModel.findOne({ email });

    if (!existinguser) {
      return res.json({
        success: false,
        message: "something went wrong",
      });
    }

    const isMatch = await bcrypt.compare(password, existinguser.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Email Or Password",
      });
    }

    // generating token
    const token = jwt.sign({ id: existinguser._id }, process.env.JWT_SECRET, {
      expiresIn: "180s",
    });

    // setting cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3 * 60 * 1000, // 3 minutes
    });

    return res.json({
      success: true,
      message: "log in success",
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

// logout controller
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
      success: true,
      message: "logout success",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

// send verification otp to the user's email
const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById({ _id: userId });

    if (user.isAccountVerified) {
      return res.json({
        success: true,
        message: "User already verified",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000;

    await user.save();

    // const updateotpuser = await userModel.findByIdAndUpdate(
    //    user._id ,
    //   {
    //     verifyOtp: otp,
    //   },{
    //     new:true
    //   }
    // );

    const mailOptions = {
      from: process.env.APP_USER,
      to: user.email,
      subject: "Verify Your Account",
      text: "Here is your OTP to verify your Account",
      html: `<div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f7fa; padding: 30px;">
    <div style="max-width: 500px; background-color: #ffffff; margin: 0 auto; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      
      <div style="background-color: #4e73df; color: #ffffff; text-align: center; padding: 20px;">
        <h2 style="margin: 0;">SecureAuth</h2>
      </div>

      <div style="padding: 30px; color: #333333; text-align: center;">
        <p style="font-size: 16px; margin-bottom: 10px;">Hi there,</p>
        <p style="font-size: 15px;">Use the following OTP to complete your verification:</p>
        
        <div style="font-size: 32px; letter-spacing: 5px; font-weight: bold; color: #4e73df; margin: 20px 0;">
          ${otp}
        </div>

        <p style="font-size: 14px; color: #666;">
          This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.
        </p>

        <div style="margin-top: 25px;">
          <a href="#" style="background-color: #4e73df; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 15px;">Verify Now</a>
        </div>
      </div>

      <div style="background-color: #f1f1f1; text-align: center; padding: 12px; font-size: 12px; color: #888;">
        © 2025 SecureAuth Inc. All rights reserved.
      </div>
    </div>
  </div>`,
    };

    try {
      await transport.sendMail(mailOptions);
      console.log("email send success");

      return res.json({
        success: true,
        message: "OTP sent",
      });
    } catch (error) {
      res.json("error while sending email");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "missing details",
    });
  }

  try {
    const user = await userModel.findById(userId);

    if(!user){
       return res.json({
      success: false,
      message: "user not Found",
    });
    }

    // check otp
    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // check expiry
    const currenttime = Date.now();

    if (currenttime >= user.verifyOtpExpireAt) {
      return res.json({
        success: false,
        message: "opt expired plefase try again later.",
      });
    }

    user.isAccountVefified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({
      success: true,
      message: "user verified",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, logout, login, sendVerifyOtp, verifyEmail };
