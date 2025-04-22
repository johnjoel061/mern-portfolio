const cloudinary = require('../utils/cloudinary');

exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'tech-stack'
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error });
  }
};

exports.deleteImage = async (req, res) => {
  const publicId = req.params.public_id;

  try {
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image', details: error });
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
