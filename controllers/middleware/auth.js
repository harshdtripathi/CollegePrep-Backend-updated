// const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    
  try {
    // console.log(req.cookies.token);
    //  console.log("body",req.body?.token);
    
    const token =req.user
      //  req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "").trim();
      console.log("token",token);
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log("decodeuser",decoded);

    // Attach payload to req.user so that it's available in all protected routes
    // req.user = decoded;
    

    next(); // move to actual route handler
  } catch (error) {
    return res.status(401).json({ 

      
      success: false, message: "Invalid token" });
  }
};

const admin = require("../../firebaseadmin");



exports.verifyfirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized access: No token" });
  }

  const idToken = authHeader.split("Bearer ")[1].trim();

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded Token:", decodedToken);
    req.user = decodedToken;

    next(); // ✅ Let the request proceed to next middleware
    // return res.status(200).json({
    //   success: true,  
    // })
  } catch (error) {
    console.error("❌ Firebase token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


