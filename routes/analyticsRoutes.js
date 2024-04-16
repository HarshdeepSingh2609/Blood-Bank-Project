const express=require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getBloodData } = require("../controller/analyticsController");


const router=express.Router();


//GET ALL BLOOD RECORDS
router.get("/blood-groups-data",authMiddleware,getBloodData);



module.exports=router;