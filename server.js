require("dotenv").config();
require("reflect-metadata");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const activityLogger = require("./app/middleware/activityLogger");
const routes = require("./app/routes/index");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(activityLogger);

app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected.");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};

startServer();
