const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const authroute = require("./Routes/Profile");
const serverless = require("serverless-http"); // ADD THIS

dotenv.config();
connectDB();

const app = express();

// Setup CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://collage-prep-omega.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Default route
app.get("/", (req, res) => {
  res.send("CollegeSaathi Backend is running");
});

app.use("/api/auth", authroute);

// ❌ Remove app.listen()
// ✅ Instead, export the handler:
module.exports = serverless(app); // Vercel expects this
