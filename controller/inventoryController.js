const  mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel= require("../models/userModel");

//post a new record
const createInventory = async(req, res) => {
    try {
        //validate user
        const {email} = req.body;
        const user = await userModel.findOne({email});
        if(!user) {
            throw new Error("User not exist");
          
        }
        // if(inventoryType==="in" &&  user.role!=="donar") {
        //     throw new Error("Not a donar")
        // }
        // if(inventoryType==="out" &&  user.role!=="hospital") {
        //     throw new Error("Not a hospital")
        // }

        if(req.body.inventoryType=="out") {

            const reqBloodGroup=req.body.bloodGroup;
            const reqQuantity=req.body.quantity;
            const organisation=new mongoose.Types.ObjectId(req.body.userId);

            //CALCULATED IN BLOOD OF BLOOD GRP
            console.log(organisation)
            const totalIn= await inventoryModel.aggregate([
                {$match:{
                    organisation,
                    inventoryType:"in",
                    bloodGroup:reqBloodGroup
                }},
                { $group:{
                        _id:"$bloodGroup",
                        total:{$sum:"$quantity"}

                    }
                }
            ])
            console.log("total in of requested blood grp ",totalIn);
            const inBlood=totalIn[0]?.total||0;


            //calculated total out
            const totalOut=await inventoryModel.aggregate([
                {$match:{
                    organisation,
                    inventoryType:"out",
                    bloodGroup:reqBloodGroup
                }},
                { $group:{
                        _id:"$bloodGroup",
                        total:{$sum:"$quantity"}

                    }
                }
            ])
            console.log("total in of requested blood grp ",totalOut);
            const outBlood=totalOut[0]?.total||0;

            const availableBlood=inBlood-outBlood;
            if(availableBlood<reqQuantity) {
                return res.status(500).send({
                    success:false,
                    message:`${availableBlood}ml is present for blood group ${reqBloodGroup}`
                })
            }
            req.body.hospital=user?._id;

        }
        else {
            req.body.donar=user?._id;
        }
       


        const inventory= new inventoryModel(req.body);
        await inventory.save();
        res.status(200).send({
            success:true,
            message:"New blood record added"
        });
    } catch (error) {
        console.log(error);
      return (res.status(500).send({
            success:false,
            message:"ERROR IN CREATE INVENTORY",
            error
        }));
    }
};
//get all records
const getInventory=async(req,res)=>{
    try {
        const inventory = await inventoryModel.find({organisation:req.body.userId}).populate("donar").populate("hospital");
        res.status(200).send({
            success:true,
            message:"SUCCESSFULLY GOT ALL RECORDS",
            inventory
        })

    } catch (error) {
        console.log(error);
       return  res.status(500).send({
            success:false,
            message:"ERROR IN GET all records ",
            error
        })
    }
};

//get hospital all blood records
const getInventoryHosp=async(req,res)=>{
    try {
        const inventory = await inventoryModel.find(req.body.filters)
        .populate("donar").populate("hospital").populate("organisation");

        res.status(200).send({
            success:true,
            message:"SUCCESSFULLY GOT ALL HOSPITAL CONSUMER RECORDS",
            inventory
        })

    } catch (error) {
        console.log(error);
       return  res.status(500).send({
            success:false,
            message:"ERROR IN GET all HOSP records ",
            error
        })
    }
};


//GET DONAR RECORD INFO
const getDonars=async(req,res)=>{
    try {
        const organisation=req.body.userId;
        //find donars
        const donarId=await inventoryModel.distinct("donar",{organisation});
        // console.log(donarId);
        const donars=await userModel.find({_id :{$in:donarId}});
        return res.status(200).send({
            success:true,
            message:"DONAR RECORD FETCH SUCCESS",
            donars
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"ERROR IN GET DONARS",
            error
        })
    }
}


//GET HOSPITAL RECORDS
const getHospitals=async(req,res)=>{
    try {
        const organisation=req.body.userId;
        //find donars
        const hospitalId=await inventoryModel.distinct("hospital",{organisation});
        // console.log(hospitalId);
        const hospitals=await userModel.find({_id :{$in:hospitalId}});
        return res.status(200).send({
            success:true,
            message:"HOSPITAL RECORD FETCH SUCCESS",
            hospitals
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"ERROR IN GET HOSPITALS",
            error
        })
    }
}

//GET ALL Organisations for donars

const getOrganisation=async(req,res)=>{
        try {
            const donar=req.body.userId;
            // console.log("Donor ID:", donar);
            const orgId=await inventoryModel.distinct("organisation",{donar});
            // console.log(orgId);
            const organisations=await userModel.find({_id :{$in:orgId}});
            
            return res.status(200).send({
                success:true,
                message:"ORGANISATION RECORD FETCH SUCCESS",
                organisations
            })
            
        } catch (error) {
            console.log(error);
        return res.status(500).send({
            success:false,
            message:"ERROR IN GET ORG",
            error
        })
        }
}

//GET ALL Organisations for hospitals

const getOrganisationHosp=async(req,res)=>{
    try {
        const hospital=req.body.userId;
        const orgId=await inventoryModel.distinct("organisation",{hospital});
        console.log(orgId);
        const organisations=await userModel.find({_id :{$in:orgId}});
        
        return res.status(200).send({
            success:true,
            message:"HOSPITAL ORGANISATION RECORD FETCH SUCCESS",
            organisations
        })
        
    } catch (error) {
        console.log(error);
    return res.status(500).send({
        success:false,
        message:"ERROR IN GET ORG HOSP",
        error
    })
    }
}

module.exports = { createInventory,getInventory,getDonars,getHospitals,getOrganisation,getOrganisationHosp,getInventoryHosp };