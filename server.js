const express=require("express");
const dotenv=require("dotenv"); 
const cors=require("cors");
const morgan=require("morgan");
const connectDB=require("./config/db");
const path=require("path");

const app=express();
app.use(express.json());
app.use(cors());

  
dotenv.config();
connectDB();

app.use(morgan('dev'));

app.use("/api/v1/test",require("./routes/testroutes"));

//register route
app.use("/api/v1/auth",require("./routes/authRoutes"));

//inventory route
app.use("/api/v1/inventory",require("./routes/inventoryRoutes"));

//analytics route
app.use("/api/v1/analytics",require("./routes/analyticsRoutes"));

//admin route
app.use("/api/v1/admin",require("./routes/adminRoutes"))

app.use(express.static(path.join(__dirname,"./client/build")));
app.get("*",function(req,res) {
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

const port=process.env.PORT ||5000;
app.listen(port,(req,res)=>{
    console.log(`server in mode ${process.env.DEV_MODE} listening to port ${port}`);
});