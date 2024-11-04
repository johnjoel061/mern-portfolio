const mongoose = require("mongoose");
const skillSchema = new mongoose.Schema(
  {
    skillName: { type: String, required: true },
    skillDescription: { type: String, required: true },

  },
  { versionKey: false, timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
