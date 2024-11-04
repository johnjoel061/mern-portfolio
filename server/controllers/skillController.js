const Skill = require("../models/skillModel");
const CreateError = require("../utils/appError");

// Controller to get all skills
exports.getAllSkill = async (req, res, next) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({
      status: "success",
      results: skills.length,
      data: skills,
    });
  } catch (error) {
    next(new CreateError("Failed to retrieve skills", 500));
  }
};

// Controller to add a new skill
exports.addSkill = async (req, res, next) => {
  try {
    const { skillName, skillDescription } = req.body;
    
    if (!skillName || !skillDescription) {
      return next(new CreateError("Skill name and description are required", 400));
    }

    // Check if the skill already exists
    const existingSkill = await Skill.findOne({ skillName });
    if (existingSkill) {
      return next(new CreateError("Skill already exists", 400));
    }

    const newSkill = await Skill.create({ skillName, skillDescription });
    res.status(201).json({
      status: "success",
      data: newSkill,
    });
  } catch (error) {
    next(new CreateError("Failed to add Skill", 500));
  }
};

// Controller to delete a skill by ID
exports.deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return next(new CreateError("Skill not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Skill deleted successfully",
    });
  } catch (error) {
    next(new CreateError("Failed to delete Skill", 500));
  }
};
