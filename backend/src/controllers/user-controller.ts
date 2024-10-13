import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
const crypto = require("crypto");

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Input fields shouldn't be empty" });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ msg: "Password should be at least 6 characters" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    email,
    password: hashedPassword,
    isRegistered: true,
  };

  try {

    const emailExists = await User.findOne({email});
    if(emailExists){
      return res.status(400).json({msg:"User already registered"})
    };

    await User.create(userData);
    console.log("registered successfully...");
    res.status(201).json({ msg: "Please login" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// login============================================================================
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Input fields shouldn't be empty" });
    return;
  }

  try {
    console.log("starting the try block...");
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User doesn't exist")
      res.status(404).json({ msg: "User doesn't exist" });
      return;
    }

    if (!user.isRegistered) {
      res.status(401).json({ msg: "Please verify your email" });
      return;
    }

    

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("passwords match...");
      res.status(401).json({ msg: "Invalid password" });
      return;
    }

  
    console.log("about to jwt.sign...");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_V!, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    console.log("done running jwt.sign...");

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      msg: "User logged in",
      user: { _id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
//googe====================================================================>>


export const google = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {

      const password = crypto.randomBytes(40).toString("hex");
      console.log("password:",password);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      console.log("hashedPassword:",hashedPassword);

      const googleData = {
        name: name,
        email: email,
        password: hashedPassword,
        provider:"Google firebase",
        isRegistered: true,
      };

      user = await User.create(googleData);
      console.log("user created:",user)
      return res.status(201).json({msg:"new user created",user})
    }
    res.status(201).json({
      msg: 'user data stored/retrieved successfully',
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

// logout====================================================================
export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ msg: "User logged out successfully" });
};

//getLoginStatus======================================================:
export const getLoginStatus = (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token");
    return res.json(false);
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET_V!);
  if (verified) {
    console.log("Token verified");
    return res.json(true);
  } else {
    return res.json(false);
  }
  // res.send("<h1>Get login status route</h1>");
};
