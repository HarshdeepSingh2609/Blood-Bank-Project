const testController=(req,res)=>{
    res.status(200).json({
        message:"Welcome to blood donation app",
        success:true
    });
    
};

module.exports={ testController };