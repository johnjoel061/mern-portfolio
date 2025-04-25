const mongoose = require("mongoose");

const CertificationSchema = new mongoose.Schema(
  {
    certificationName: { type: String, required: true },
    certificationDescription: { type: String, required: true },
    certificationDate: { type: Date, required: true },
    certificationLink: { type: String, required: true }
  },
  { versionKey: false, timestamps: true }
);

const Certification = mongoose.model("Certification", CertificationSchema);

module.exports = Certification;
