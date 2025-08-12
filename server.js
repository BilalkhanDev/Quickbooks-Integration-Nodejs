require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
require("reflect-metadata");
const express = require("express");
const cors = require("cors");
const app = express();
const routes=require('./app/routes/index')
const connectDB = require('./app/config/db.config');
const { ActivityLogger, errorHandler, morgan } = require('./app/middleware');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  
app.use(cors());  


app.use(morgan);

app.use("/api", routes);

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
