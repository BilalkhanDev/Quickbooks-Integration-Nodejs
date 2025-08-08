const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

// Init S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_S3_URL, 
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extValid = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeValid = allowed.test(file.mimetype);
  if (extValid && mimeValid) cb(null, true);
  else cb(new Error("Only JPG, PNG, GIF, PDF, DOC, and DOCX allowed."));
};

// Multer with memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const s3AssetUploader = (folder = "uploads/assets", fieldName = null, maxCount = 3) => {
  const uploader = fieldName
    ? upload.array(fieldName, maxCount)  
    : upload.any();                      

  return [
    uploader,

    async (req, res, next) => {
          console.log("Files",req.files)
      try {
        if (!req.files || req.files.length === 0) {
          req.s3Urls = [];
          req.s3Uploads = [];
          req.s3Grouped = {};
          return next();
        }
    console.log("Files",req.files)
        const uploads = await Promise.all(
          req.files.map(async (file) => {
            const ext = path.extname(file.originalname);
            const fileName = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}${ext}`;
            const key = `${folder}/${fileName}`;

            const command = new PutObjectCommand({
              Bucket: process.env.AWS_S3_BUCKET_NAME,
              Key: key,
              Body: file.buffer,
              ContentType: file.mimetype,
              ACL: "public-read",
            });

            await s3.send(command);

            return {
              fieldName: file.fieldname,
              originalname: file.originalname,
              url: `${process.env.AWS_S3_URL}${process.env.AWS_S3_BUCKET_NAME}/${key}`,
              key,
            };
          })
        );
     console.log("Upoads",uploads)
        // Flat URLs
        req.s3Urls = uploads.map(u => u.url);
        // Full metadata
        req.s3Uploads = uploads;
        // Grouped by fieldName (for dynamic fields)
        req.s3Grouped = uploads.reduce((acc, file) => {
          acc[file.fieldName] = acc[file.fieldName] || [];
          acc[file.fieldName].push(file.url);
          return acc;
        }, {});

        next();
      } catch (err) {
        console.error("S3 upload error:", err);
        return res.status(500).json({ error: "File upload to S3 failed." });
      }
    }
  ];
};

module.exports = s3AssetUploader;


