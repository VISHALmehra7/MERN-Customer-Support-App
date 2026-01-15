import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { generateJwt } from "../utils/generateJwt.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const success = checkUser(name, email, password);
    if (!success) {
      return res.status(400).json({ success: false, message: "Invalid Input" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      await newUser.save();
    }
    generateJwt(newUser._id, res);
    res.status(200).json({
      success: true,
      message: "Signup Successfull",
      user: { ...newUser._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error occured in signup controller : ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Invalid Input" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credentials" });
    }
    const isValidPass = await bcrypt.compare(password, existingUser.password);
    if (!isValidPass) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong Credentials" });
    }
    generateJwt(existingUser._id, res);
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      user: {
        ...existingUser._doc,
        password: undefined,
        
      },
    });
  } catch (error) {
    console.log("Error occured in login controller : ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: true, message: "Logout Successfull" });
  } catch (error) {
    console.log("Error occured in logout controller : ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const checkAuth = async(req,res)=>{
    try {
        const user = await User.findById(req.userId)
        if(!user){
          return res.status(400).json({success:false,message:"User not found"})
        }
        res.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:undefined,
                
            }
        })
    } catch (error) {
        console.log("Error occured in checkAuth controller : ",error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

function checkUser(name, email, password) {
  if (!name || !email || !password) {
    return false;
  } else if (password.length < 6) {
    return false;
  }
  return true;
}
