const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    
    experienceName: { type: String, required: true },
    companyName: { type: String, required: true },
    experienceDate: { type: String, required: true },
    experienceDescription: { type: String, required: true },

  },
  { versionKey: false, timestamps: true }
)

const Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = Experience;
