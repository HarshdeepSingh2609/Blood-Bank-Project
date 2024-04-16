const JWT=require("jsonwebtoken");
module.exports=async(req,res,next)=> {
    try {
        const token=req.headers["authorization"].split(" ")[1]; //splits bearen<token>
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=> { //checks whether token was given by jwt_secret id only
            if(err) {
                return res.status(401).send( {
                    success:false,
                    message:"Auth failed"
                })
            }
            else {
                req.body.userId=decode.userId;
                next();
            }
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message:"AUTH FAILED",
            error
        })
    }
}


// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//     try {
//         // Check if Authorization header exists
//         if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
//             return res.status(401).send({
//                 success: false,
//                 message: "Authorization header missing or invalid"
//             });
//         }

//         // Extract token from Authorization header
//         const token = req.headers.authorization.split(" ")[1]; // Extracts token after "Bearer"

//         // Verify token
//         JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//             if (err) {
//                 return res.status(401).send({
//                     success: false,
//                     message: "Authentication failed"
//                 });
//             } else {
//                 // If token is valid, add decoded userId to req.body
//                 req.body.userId = decode.userId;
//                 next();
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(401).send({
//             success: false,
//             message: "Authentication failed",
//             error: error.message // Sending only the error message
//         });
//     }
// };

