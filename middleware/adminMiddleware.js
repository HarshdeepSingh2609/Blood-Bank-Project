const userModel=require("../models/userModel");
module.exports=async(req,res,next)=>{
    try {
        const user=await userModel.findById(req.body.userId);
        //Validate admin role
        if(user?.role!=="admin") {
            return res.status(401).send({
                success:false,
                message:"AUTH FAILED ",
            });
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"AUTH FAILED,ADMIN ",
            error
        })
    }
}