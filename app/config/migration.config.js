
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
const path=require('path')
if (!process.env.MONGO_URI || !process.env.MONGODB_DB) {
  throw new Error("Missing MONGO_URI or MONGODB_DB in environment variables");
}
const configPath = path.join(__dirname, "..",'migrations');


module.exports = {
  mongodb: {
    url: process.env.MONGO_URI,
    databaseName: process.env.MONGODB_DB,
  },
  migrationsDir: configPath,
  changelogCollectionName: "changelog",
  moduleSystem: "commonjs",
};
