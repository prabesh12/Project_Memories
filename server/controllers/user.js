import bcrypt from "bcryptjs" ;
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin= async(req,res)=>{
    const {email, password}=req.body;

    try {
        const oldUser = await User.findOne({email});
        if(!oldUser) return res.status(404).json({message:`user with email ${email} doesn't exist.`});
        const isCorrectPassword = await bcrypt.compare(password, oldUser.password);
        if(!isCorrectPassword) return res.status(400).json({message:"please enter correct password"});

        const token = jwt.sign({email:oldUser.email, id: oldUser._id },'Prabesh', {expiresIn:"1hr"});
        res.status(200).json({result: oldUser, token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
        
    }

}

export const signup= async(req,res)=>{
    const {email, password, confirmPassword, firstName, lastName}= req.body;


    try {
        const oldUser = await User.findOne({email});
        if(oldUser) return res.status(400).json({message:`user with email ${email} already exist.`});
        if (password!= confirmPassword) return res.status(400).json({message:"password don't match"});
        

        const hashPassword = await bcrypt.hash(password, 12);
        const result = await User.create({email, password: hashPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({email:result.email, id: result._id },'Prabesh', {expiresIn:"1hr"});
        res.status(200).json({result, token});
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});

        
    }
    
}