const mongoose = require("mongoose");
const ExperienceSchema = new mongoose.Schema(
  {
    yearStart: { type: String, required: true },
    yearEnd: { type: String, required: true },

    ExperienceDescription: { type: String, required: true },

  },
  { versionKey: false, timestamps: true }
)

const Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = Experience;
