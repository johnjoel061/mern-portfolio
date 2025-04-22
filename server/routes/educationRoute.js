const express = require("express");
const router = express.Router();
const educationController = require("../controllers/educationController");

router.post("/education/add", educationController.addEducation);
router.get("/education/all", educationController.getAllEducation);
router.delete("/education/:id", educationController.deleteEducation);
router.put("/education/update/:id", educationController.updateEducation);

module.exports = router;

