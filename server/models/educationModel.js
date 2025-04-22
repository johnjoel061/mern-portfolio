const mongoose = require("mongoose");
const EducationSchema = new mongoose.Schema(
  {
    
    educationName: { type: String, required: true },
    courseName: { type: String, required: true },
    educationDate: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
)

const Education = mongoose.model("Education", EducationSchema);

module.exports = Education;
