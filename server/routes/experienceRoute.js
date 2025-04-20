const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experienceController");

router.post("/experience/add", experienceController.addExperience);
router.get("/experience/all", experienceController.getAllExperience);
router.delete("/experience/:id", experienceController.deleteExperience);
router.put("/experience/update/:id", experienceController.updateExperience);

module.exports = router;

