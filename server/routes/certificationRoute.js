const express = require("express");
const router = express.Router();
const certificationController = require("../controllers/certificationController");

router.post("/certification/add", certificationController.addCertification);
router.get("/certification/all", certificationController.getAllCertifications);
router.delete("/certification/:id", certificationController.deleteCertification);
router.put("/certification/update/:id", certificationController.updateCertification);

module.exports = router;

