// const cloudinary = require('../utils/cloudinary');
const { v2: cloudinary } = require('cloudinary');

exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'tech-stack'
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
      name: req.file.originalname,
      size: req.file.size,
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error });
  }
};


exports.deleteImage = async (req, res) => {
  const publicId = req.params.public_id;

  try {
    // Decode the public ID to handle any URL encoding
    const decodedPublicId = decodeURIComponent(publicId);

    // Destroy the image and invalidate cached versions
    const result = await cloudinary.uploader.destroy(decodedPublicId, {
      invalidate: true,
      resource_type: 'image', // Specify the resource type if it's an image
    });

    if (result.result === 'ok') {
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ error: 'Image not found or already deleted' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image', details: error.message });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'tech-stack/',
      max_results: 100
    });

    res.json(result.resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images', details: error });
  }
};
