const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experienceController");

router.post("/experience/add", experienceController.addSkill);
router.get("/experience/all", experienceController.getAllSkill);
router.delete("/experience/:id", experienceController.deleteSkill);
router.put("/experience/update/:id", experienceController.updateSkill);

module.exports = router;

