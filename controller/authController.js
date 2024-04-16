const userModel = require("../models/userModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
//register 
const registerController= async(req,res)=>{
    try {
        //validate
        const existingUser=await userModel.findOne({ email:req.body.email});
        if(existingUser) {
            return res.status(200).send({
                success:false,
                message:"user alreasy exist"
            });
        }
        //hashing of pass
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        req.body.password=hashedPassword;

        //register user
        const user=new userModel(req.body);
        await user.save();
        return res.status(201).send({
            success:true,
            message:"User registered successfully",user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in register ",
            error
        });
    }
};

//login
const loginController=async(req,res)=>{
    try {
        //CHECK existence of user
        const user=await userModel.findOne({email:req.body.email});
        if(!user) {
            return res.status(404).send({
                success:false,
                message:"Invalid Username or Password"
            });
        }
        //check role
        if(user.role!==req.body.role) {
            res.status(500).send({
                status:false,
                message:"Role does not exist"
            })
        }
        //check pass
        const pass=await bcrypt.compare(req.body.password,user.password);
        if(!pass) {
            return res.status(404).send({
                success:false,
                message:"Invalid Username or Password"
            });

        }
        
        //create and encrypted unique token for user
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

        return res.status(200).send({
            success:true,
            message:"LOGIN SUCCESSFULL",
            token,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login ",
            error
        });
    }
};

//get current user
const currentUserController=async(req,res)=>{
    try {
        const user=await userModel.findOne({_id:req.body.userId});
        return res.status(200).send({
            success:true,
            message:"USER FETCHED SUCCESSFULLY",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in fetching user ",
            error
        });
    }
};

module.exports={registerController,loginController,currentUserController};