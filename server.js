require('dotenv').config();
require('reflect-metadata');
const express = require('express');
const mongoose=require("mongoose");
const cors = require('cors');
const activityLogger = require('./app/middleware/activityLogger');
const  routes  = require('./app/routes/index');
const app = express();
const { initializeRedis } = require('./app/utils/redis');
const { createAdminUser } = require('./app/seeder/adminSeeder');
app.use(cors());
app.use(express.json());

app.use(activityLogger);

app.use('/api', routes);
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected.");

    await initializeRedis();

    await createAdminUser();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};

startServer();