const userModel=require("../models/userModel");


//DONAR-LIST
const getDonarList= async(req,res)=>{
    try {
        const donardata=await userModel.find({role:"donar"}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:"fetched all donars success",
            donardata
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in getdonars",
            error
        })
    }
}


//HOSP-LIST
const getHospitalList= async(req,res)=>{
    try {
        const hospitaldata=await userModel.find({role:"hospital"}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:"fetched all hospitals success",
            hospitaldata
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in gethospitals",
            error
        })
    }
}


//ORG-LIST
const getOrgList= async(req,res)=>{
    try {
        const orgdata=await userModel.find({role:"organisation"}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            message:"fetched all org success",
            orgdata
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in getorg",
            error
        })
    }
}


//DELETE DONAR
const deleteDonar=async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Record removed successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in delete org",
            error
        })
    }
}


//DELETE HOSPITAL
const deleteHosp=async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Record removed successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in delete org",
            error
        })
    }
}


//DELETE ORG
const deleteOrg=async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Record removed successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in delete org",
            error
        })
    }
}


module.exports={getDonarList,getHospitalList,getOrgList,deleteDonar,deleteHosp,deleteOrg};