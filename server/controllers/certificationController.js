const Certification = require("../models/certificationModel");
const CreateError = require("../utils/appError");

// Controller to get all certifications
exports.getAllCertifications = async (req, res, next) => {
  try {
    const certifications = await Certification.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: certifications.length,
      data: certifications,
    });
  } catch (error) {
    next(new CreateError("Failed to retrieve certifications", 500));
  }
};

// Controller to add a new certification
exports.addCertification = async (req, res, next) => {
  try {
    const {
      certificationName,
      certificationDescription,
      certificationDate,
      certificationLink,
    } = req.body;

    if (
      !certificationName ||
      !certificationDescription ||
      !certificationDate ||
      !certificationLink
    ) {
      return next(
        new CreateError(
          "All fields are required: certificationName, certificationDescription, certificationDate, and certificationLink",
          400
        )
      );
    }

    const existingCertification = await Certification.findOne({
      certificationName,
      certificationDate,
    });

    if (existingCertification) {
      return next(new CreateError("Certification already exists", 400));
    }

    const newCertification = await Certification.create({
      certificationName,
      certificationDescription,
      certificationDate,
      certificationLink,
    });

    res.status(201).json({
      status: "success",
      data: newCertification,
    });
  } catch (error) {
    next(new CreateError("Failed to add certification", 500));
  }
};

// Controller to delete a certification by ID
exports.deleteCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCertification = await Certification.findByIdAndDelete(id);

    if (!deletedCertification) {
      return next(new CreateError("Certification not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Certification deleted successfully",
    });
  } catch (error) {
    next(new CreateError("Failed to delete certification", 500));
  }
};

// Controller to update a certification by ID
exports.updateCertification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      certificationName,
      certificationDescription,
      certificationDate,
      certificationLink,
    } = req.body;

    if (
      !certificationName &&
      !certificationDescription &&
      !certificationDate &&
      !certificationLink
    ) {
      return next(
        new CreateError("At least one field is required for update", 400)
      );
    }

    const updatedCertification = await Certification.findByIdAndUpdate(
      id,
      {
        certificationName,
        certificationDescription,
        certificationDate,
        certificationLink,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCertification) {
      return next(new CreateError("Certification not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: updatedCertification,
    });
  } catch (error) {
    next(new CreateError("Failed to update certification", 500));
  }
};
