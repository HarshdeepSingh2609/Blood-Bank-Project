const express=require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createInventory, getInventory, getDonars, getHospitals, getOrganisation, getOrganisationHosp, getInventoryHosp } = require("../controller/inventoryController");

const router=express.Router();
//POST INVENTORY
router.post("/create-inventory",authMiddleware,createInventory);

//GET ALL RECORDS
router.get("/get-records",authMiddleware,getInventory);

//GET ALL HOSP RECORDS
router.post("/get-records-hospital",authMiddleware,getInventoryHosp);

//GET DONAR RECORDS
router.get("/get-donars",authMiddleware,getDonars);

//GET HOSPITALS
router.get("/get-hospitals",authMiddleware,getHospitals);

//GET ORGANISATIONS FOR DONARS
router.get("/get-organisation",authMiddleware,getOrganisation);

//GET ORGANISATIONS FOR HOSPITALS
router.get("/get-organisation-for-hospitals",authMiddleware,getOrganisationHosp);

module.exports=router;