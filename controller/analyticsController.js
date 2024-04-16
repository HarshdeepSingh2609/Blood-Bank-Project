// const  mongoose  = require("mongoose");
// const inventoryModel = require("../models/inventoryModel");


// //GET BLOOD DATA
// const getBloodData = async (req, res) => {
//     try {
//         const bloodgps= ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
//         const bloodgpsData=[];
//         const organisation=new mongoose.Types.ObjectId(req.body.usedId);
//         console.log(organisation);
//         await Promise.all(bloodgps.map(async(bloodGroup)=>{
//             //TOTAL IN BLOOD FOR ALL BLOOD GRPS
//             const totalIn=await inventoryModel.aggregate([
//                     {$match:{
//                         bloodGroup:bloodGroup,
//                         inventoryType:"in",
//                         organisation
//                     }},
//                     {
//                         $group:{
//                             _id:null,
//                             total:{$sum:"$quantity"}
//                         }
//                     }
//                 ]);

//                  //TOTAL OUT BLOOD FOR ALL BLOOD GRPS
//             const totalOut=await inventoryModel.aggregate([
//                 {$match:{
//                     bloodGroup:bloodGroup,
//                     inventoryType:"out",
//                     organisation
//                 }},
//                 {
//                     $group:{
//                         _id:null,
//                         total:{$sum:"$quantity"}
//                     }
//                 }
//             ]);

//             const availableBlood= (totalIn[0]?.total ||0) -(totalOut[0]?.total||0);
      
//             //STORE IN bloodgpsdata
//             bloodgpsData.push({
//                 bloodGroup,
//                 totalIn:totalIn[0]?.total ||0,
//                 totalOut:totalOut[0]?.total||0,
//                 availableBlood
//             });

            
//         }));

//         return res.status(200).send({
//             success:true,
//             message:"Blood grp data fetched successfully",
//             bloodgpsData
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             success:false,
//             message:"Error in blood group data"
//         })
//     }
// }

// module.exports = { getBloodData };


const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");

// GET BLOOD DATA
const getBloodData = async (req, res) => {
    try {
        const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
        const bloodGroupData = [];
       
        const organisation = new mongoose.Types.ObjectId(req.body.userId); 
        console.log(organisation);

        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            // TOTAL IN BLOOD FOR ALL BLOOD GROUPS
            const totalIn = await inventoryModel.aggregate([
                { $match: { bloodGroup: bloodGroup, inventoryType: "in", organisation: organisation } },
                { $group: { _id: null, total: { $sum: "$quantity" } } }
            ]);

            // TOTAL OUT BLOOD FOR ALL BLOOD GROUPS
            const totalOut = await inventoryModel.aggregate([
                { $match: { bloodGroup: bloodGroup, inventoryType: "out", organisation: organisation } },
                { $group: { _id: null, total: { $sum: "$quantity" } } }
            ]);

            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

            // STORE IN bloodGroupData
            bloodGroupData.push({
                bloodGroup,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availableBlood
            });
        }));

        return res.status(200).send({
            success: true,
            message: "Blood group data fetched successfully",
            bloodGroupData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in blood group data",
            error
        });
    }
};

module.exports = { getBloodData };
