const express= require("express");
const upload = require("../controllers/middleware/multer");
const router = express.Router();
const {
    login,Signup
}
=require("../controllers/Auth");
const {
    getallSemestermaterial,
    getsubjectmaterial
}=
require("../controllers/SemesterNotes");

const {
handleUpload
}= require("../controllers/Uploadmat");

const {StudentContact}=require("../controllers/StudentContact")
const {auth}= require("../controllers/middleware/auth");

const {verifyfirebaseToken}= require("../controllers/middleware/auth")
const {logout}= require("../controllers/Logout");
const {Getavailablesubject}= require("../controllers/Getavalablesubjet")
router.post("/protected", verifyfirebaseToken, (req, res) => {
  // Now req.user is guaranteed
  return res.status(200).json({
    success: true,
    message: "You accessed a protected route!",
    // user: req.user, // You can return user info if needed
  });
});

router.post("/login",login);
router.post("/signup",Signup);
router.get("/getsubjectdetails",verifyfirebaseToken,getsubjectmaterial)
router.post("/upload", upload.array("files", 5), handleUpload);
router.post("/contact",verifyfirebaseToken,StudentContact );
router.get("/getuploadedsibject",verifyfirebaseToken,Getavailablesubject);
// router.post("/logout",logout );

module.exports=router;
