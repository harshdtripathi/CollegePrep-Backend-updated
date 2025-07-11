const express = require("express");
const upload = require("../controllers/middleware/multer");
const router = express.Router();

// Controllers
const { login, Signup } = require("../controllers/Auth");
const { getallSemestermaterial, getsubjectmaterial } = require("../controllers/SemesterNotes");
const { handleUpload } = require("../controllers/Uploadmat");
const { StudentContact } = require("../controllers/StudentContact");
const { auth, verifyfirebaseToken } = require("../controllers/middleware/auth");
const { Getavailablesubject } = require("../controllers/Getavalablesubjet");

// ✅ CORS headers middleware (manual fix for Vercel)
// const corsHeaders = require("../controllers/middleware/corsHeaders");

// // Apply CORS to all routes
// router.use(corsHeaders);

// 🔒 Protected test route
router.post("/protected", verifyfirebaseToken, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "You accessed a protected route!",
  });
});

// 🔐 Auth routes
router.post("/login", login);
router.post("/signup", Signup);

// 📄 Subject + Material
router.get("/getsubjectdetails", verifyfirebaseToken, getsubjectmaterial);

// ⬆️ Upload files (max 5 files)
router.post("/upload", upload.array("files", 5), handleUpload);

// 📩 Contact form
router.post("/contact", verifyfirebaseToken, StudentContact);

// 📚 Get uploaded subject data
router.get("/getuploadedsibject", Getavailablesubject);


module.exports = router;
