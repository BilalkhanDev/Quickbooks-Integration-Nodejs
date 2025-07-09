const express = require("express");
const {
  fundingSource,
  los,
  serviceAreas,
  equipments,
  spaceTypes,
} = require("../controller/commonController");
const reqValidator = require("../middleware/reqValidator");
const router = express.Router();

router.post("/fs", reqValidator("tokenSchema", "body"), fundingSource);
router.post("/los", reqValidator("tokenSchema", "body"), los);
router.post("/serviceArea", reqValidator("tokenSchema", "body"), serviceAreas);
router.post("/equipment", reqValidator("tokenSchema", "body"), equipments);
router.post("/spaceTypes", reqValidator("tokenSchema", "body"), spaceTypes);
module.exports = router;
