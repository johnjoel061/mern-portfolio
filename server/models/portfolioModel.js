const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    projectTechStack: {
      type: [String],
      required: true,
    },
    projectGithubUrl: {
      type: String,
      required: true,
    },
    projectDemoUrl: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = Portfolio;
