const express=require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getDonarList, getHospitalList, getOrgList, deleteDonar, deleteHosp, deleteOrg } = require("../controller/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");



const router=express.Router();


//GET DONAR LIST
router.get("/donar-list",authMiddleware,adminMiddleware,getDonarList);

//GET HOSPITAL LIST
router.get("/hospital-list",authMiddleware,adminMiddleware,getHospitalList);


//GET ORGANISATION LIST
router.get("/org-list",authMiddleware,adminMiddleware,getOrgList);

//DELETE DONAR
router.delete("/delete-donar/:id",authMiddleware,adminMiddleware,deleteDonar);

//DELETE HOSPITAL
router.delete("/delete-hospital/:id",authMiddleware,adminMiddleware,deleteHosp);

//DELETE ORGANIZATION
router.delete("/delete-org/:id",authMiddleware,adminMiddleware,deleteOrg);

module.exports=router;