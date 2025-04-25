const Portfolio = require("../models/portfolioModel");
const CreateError = require("../utils/appError");

// Get all portfolio projects
exports.getAllPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: portfolios.length,
      data: portfolios,
    });
  } catch (error) {
    next(new CreateError("Failed to retrieve portfolio projects", 500));
  }
};

// Add a new portfolio project
exports.addPortfolio = async (req, res, next) => {
  try {
    const {
      projectTitle,
      projectDescription,
      projectTechStack,
      projectGithubUrl,
      projectDemoUrl,
    } = req.body;

    if (
      !projectTitle ||
      !projectDescription ||
      !projectTechStack ||
      !projectGithubUrl ||
      !projectDemoUrl
    ) {
      return next(
        new CreateError(
          "All fields are required: projectTitle, projectDescription, projectTechStack, projectGithubUrl, and projectDemoUrl",
          400
        )
      );
    }

    const existingProject = await Portfolio.findOne({
      projectTitle,
      projectGithubUrl,
    });

    if (existingProject) {
      return next(new CreateError("Project already exists", 400));
    }

    const newProject = await Portfolio.create({
      projectTitle,
      projectDescription,
      projectTechStack,
      projectGithubUrl,
      projectDemoUrl,
    });

    res.status(201).json({
      status: "success",
      data: newProject,
    });
  } catch (error) {
    next(new CreateError("Failed to add portfolio project", 500));
  }
};

// Delete a portfolio project by ID
exports.deletePortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProject = await Portfolio.findByIdAndDelete(id);

    if (!deletedProject) {
      return next(new CreateError("Portfolio project not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Portfolio project deleted successfully",
    });
  } catch (error) {
    next(new CreateError("Failed to delete portfolio project", 500));
  }
};

// Update a portfolio project by ID
exports.updatePortfolio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      projectTitle,
      projectDescription,
      projectTechStack,
      projectGithubUrl,
      projectDemoUrl,
    } = req.body;

    if (
      !projectTitle &&
      !projectDescription &&
      !projectTechStack &&
      !projectGithubUrl &&
      !projectDemoUrl
    ) {
      return next(
        new CreateError("At least one field is required for update", 400)
      );
    }

    const updatedProject = await Portfolio.findByIdAndUpdate(
      id,
      {
        projectTitle,
        projectDescription,
        projectTechStack,
        projectGithubUrl,
        projectDemoUrl,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return next(new CreateError("Portfolio project not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: updatedProject,
    });
  } catch (error) {
    next(new CreateError("Failed to update portfolio project", 500));
  }
};
