const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const {
  uploadImage,
  deleteImage,
  getAllImages
} = require('../controllers/techStackController');

router.post('/upload-image', upload.single('image'), uploadImage);
router.delete('/delete-image/:folder/:public_id', deleteImage);
router.get('/all-images', getAllImages);

module.exports = router;
