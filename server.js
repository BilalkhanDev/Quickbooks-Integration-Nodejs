require("dotenv").config();
require("reflect-metadata");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
const routes=require('./src/app/routes/index')
const { ActivityLogger, errorHandler, morgan } = require("./src/shared/middleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ActivityLogger);
app.use(errorHandler);
app.use(morgan);

app.use("/api", routes);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
