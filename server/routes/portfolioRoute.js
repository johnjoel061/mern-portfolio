const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfolioController");

router.post("/portfolio/add", portfolioController.addPortfolio);
router.get("/portfolio/all", portfolioController.getAllPortfolios);
router.delete("/portfolio/:id", portfolioController.deletePortfolio);
router.put("/portfolio/update/:id", portfolioController.updatePortfolio);

module.exports = router;

