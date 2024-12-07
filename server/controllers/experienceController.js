const Experience = require("../models/ExperienceModel");
const CreateError = require("../utils/appError");

// Controller to get all skills
exports.getAllExperience = async (req, res, next) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json({
      status: "success",
      results: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(new CreateError("Failed to retrieve experiences", 500));
  }
};

// Controller to add a new skill
exports.addExperience = async (req, res, next) => {
  try {
    const { yearStart, yearEnd, experienceDescription } = req.body;
    
    if (!yearStart || !yearEnd || !experienceDescription) {
      return next(new CreateError("Year start, end, and description are required", 400));
    }

    // Check if the skill already exists
    const existingExperience = await Experience.findOne({ experienceDescription });
    if (existingExperience) {
      return next(new CreateError("Experience already exists", 400));
    }

    const newExperience = await Experience.create({ yearStart, yearEnd, experienceDescription });
    res.status(201).json({
      status: "success",
      data: newExperience,
    });
  } catch (error) {
    next(new CreateError("Failed to add Experience", 500));
  }
};

// Controller to delete a skill by ID
exports.deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedExperience = await Skill.findByIdAndDelete(id);

    if (!deletedExperience) {
      return next(new CreateError("Experience not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Experience deleted successfully",
    });
  } catch (error) {
    next(new CreateError("Failed to delete experience", 500));
  }
};
