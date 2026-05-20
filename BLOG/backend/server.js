import exp from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userApp } from "./APIs/UserAPI.js";
import { commonApp } from "./APIs/CommonAPI.js";
import { adminApp } from "./APIs/AdminAPI.js";
import { authorApp } from "./APIs/AuthorAPI.js";

config();

const app = exp();


// ✅ FINAL CORS CONFIG (handles everything)
const allowedOrigins = [
   "http://localhost:5173",
  "https://blogfrontend-gold.vercel.app"

];

app.use(cors({
  origin: function (origin, callback) {
    if (
      !origin || // Postman / mobile apps
      allowedOrigins.includes(origin) || // your main domains
      origin.includes("vercel.app") // 🔥 ALL Vercel deployments
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


// ✅ Middlewares
app.use(cookieParser());
app.use(exp.json());


// ✅ Routes
app.use("/user-api", userApp);
app.use("/author-api", authorApp);
app.use("/admin-api", adminApp);
app.use("/auth", commonApp);


// ✅ Database + Server Start
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ DB connected");

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });

  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();


// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: `Path ${req.url} is Invalid`
  });
});


// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);

  // Handle CORS error
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: err.message
    });
  }

  res.status(500).json({
    message: "Server error",
    error: err.message
  });
});