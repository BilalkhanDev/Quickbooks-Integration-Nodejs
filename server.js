require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
require("reflect-metadata");
const express = require("express");
const mongoose = require("mongoose");
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require("cors");
const app = express();
const path = require("path");
const routes=require('./src/app/routes/index')
const connectDB = require('./src/config/db.config');
const { ActivityLogger, errorHandler, morgan } = require('./src/app/middleware');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  
// app.use(xss({ whiteList: [], stripIgnoreTagBody: ['script'] }));
// app.use(mongoSanitize()); 
app.use(cors());  


app.use(morgan);

app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(ActivityLogger);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
