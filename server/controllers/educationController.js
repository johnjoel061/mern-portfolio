const Education = require("../models/educationModel");
const CreateError = require("../utils/appError");

// Controller to get all education entries
exports.getAllEducation = async (req, res, next) => {
  try {
    const education = await Education.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: education.length,
      data: education,
    });
  } catch (error) {
    next(new CreateError("Failed to retrieve education records", 500));
  }
};

// Controller to add a new education entry
exports.addEducation = async (req, res, next) => {
  try {
    const { educationName, courseName, educationDate } = req.body;

    if (!educationName || !courseName || !educationDate) {
      return next(
        new CreateError("All fields are required: educationName, courseName, and educationDate", 400)
      );
    }

    const existingEducation = await Education.findOne({
      educationName,
      courseName,
      educationDate,
    });

    if (existingEducation) {
      return next(new CreateError("Education record already exists", 400));
    }

    const newEducation = await Education.create({
      educationName,
      courseName,
      educationDate,
    });

    res.status(201).json({
      status: "success",
      data: newEducation,
    });
  } catch (error) {
    next(new CreateError("Failed to add education", 500));
  }
};

// Controller to delete an education entry by ID
exports.deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEducation = await Education.findByIdAndDelete(id);

    if (!deletedEducation) {
      return next(new CreateError("Education record not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Education record deleted successfully",
    });
  } catch (error) {
    next(new CreateError("Failed to delete education record", 500));
  }
};

// Controller to update an education entry by ID
exports.updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { educationName, courseName, educationDate } = req.body;

    if (!educationName && !courseName && !educationDate) {
      return next(
        new CreateError("At least one field is required for update", 400)
      );
    }

    const updatedEducation = await Education.findByIdAndUpdate(
      id,
      { educationName, courseName, educationDate },
      { new: true, runValidators: true }
    );

    if (!updatedEducation) {
      return next(new CreateError("Education record not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: updatedEducation,
    });
  } catch (error) {
    next(new CreateError("Failed to update education record", 500));
  }
};
