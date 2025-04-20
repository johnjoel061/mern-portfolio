const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");

router.post("/skill/add", skillController.addSkill);
router.get("/skill/all", skillController.getAllSkill);
router.delete("/skill/:id", skillController.deleteSkill);
router.put("/skill/update/:id", skillController.updateSkill);

module.exports = router;
