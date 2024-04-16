const express=require("express");
const { registerController, loginController, currentUserController } = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router=express.Router();
//POST REGISTER
router.post("/register",registerController);

//POST LOGIN
router.post("/login",loginController);

//GET CURRENT USER
router.get("/current-user",authMiddleware,currentUserController)

module.exports=router;