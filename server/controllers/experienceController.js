const Experience = require("../models/experienceModel");
const CreateError = require("../utils/appError");

// Controller to get all experiences
exports.getAllExperience = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(new CreateError("Failed to retrieve experiences", 500));
  }
};

// Controller to add a new experience
exports.addExperience = async (req, res, next) => {
  try {
    const { experienceName, companyName, experienceDate, experienceDescription } = req.body;

    if (!experienceName || !companyName || !experienceDate || !experienceDescription) {
      return next(
        new CreateError("All fields are required: experienceName, companyName, experienceDate, and experienceDescription", 400)
      );
    }

    const existingExperience = await Experience.findOne({
      experienceName,
      companyName,
      experienceDate,
    });

    if (existingExperience) {
      return next(new CreateError("Experience already exists", 400));
    }

    const newExperience = await Experience.create({
      experienceName,
      companyName,
      experienceDate,
      experienceDescription,
    });

    res.status(201).json({
      status: "success",
      data: newExperience,
    });
  } catch (error) {
    next(new CreateError("Failed to add experience", 500));
  }
};

// Controller to delete an experience by ID
exports.deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedExperience = await Experience.findByIdAndDelete(id);

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

// Controller to update an experience by ID
exports.updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { experienceName, companyName, experienceDate, experienceDescription } = req.body;

    // Check if at least one field is provided
    if (!experienceName && !companyName && !experienceDate && !experienceDescription) {
      return next(
        new CreateError("At least one field is required for update", 400)
      );
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      { experienceName, companyName, experienceDate, experienceDescription },
      { new: true, runValidators: true }
    );

    if (!updatedExperience) {
      return next(new CreateError("Experience not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: updatedExperience,
    });
  } catch (error) {
    next(new CreateError("Failed to update experience", 500));
  }
};
