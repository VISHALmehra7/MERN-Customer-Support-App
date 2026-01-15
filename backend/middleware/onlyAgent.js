import { User } from "../models/UserModel.js"

export const onlyAgent=async(req,res,next)=>{
    const user = await User.findById(req.userId)
    if(!user){
        return res.status(404).json({success:false,message:"User not found"})
    }
    if(user.role!=="agent"){
        return res.status(403).json({success:false,message:"You Are Unauthorized"})
    }
    next()
}