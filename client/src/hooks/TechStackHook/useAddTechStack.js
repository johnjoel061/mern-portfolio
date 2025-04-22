import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const useAddTechStack = () => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'ml_default'); // Replace with your preset
    formData.append('cloud_name', 'duifaweje');        // Optional

    try {
      setLoading(true);

      // Step 1: Upload to Cloudinary
      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/duifaweje/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await cloudinaryRes.json();

      if (!data.secure_url) {
        throw new Error('Cloudinary upload failed!');
      }

      // Step 2: Save image URL to backend
      const res = await axios.post(
        'http://localhost:3000/api/tech-stack/upload-image',
        { imageUrl: data.secure_url }
      );

      message.success('Image uploaded successfully!');
      return res.data;
    } catch (err) {
      message.error(err.response?.data?.error || err.message || 'Image upload failed!');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading };
};

export default useAddTechStack;
