import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const useAddTechStack = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const cloudinaryBaseUrl = "https://res.cloudinary.com/duifaweje/image/upload/";

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'ml_default'); // Make sure this matches your Cloudinary settings

    try {
      setLoading(true);

      // Upload image to Cloudinary
      const cloudinaryRes = await fetch(
        'https://api.cloudinary.com/v1_1/duifaweje/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await cloudinaryRes.json();

      if (!data.secure_url || !data.public_id) {
        throw new Error('Cloudinary upload failed!');
      }

      // Save image to backend
      const res = await axios.post('http://localhost:3000/api/tech-stack/upload-image', {
        imageUrl: data.secure_url,
        public_id: data.public_id,
      });

      message.success('Tech stack image uploaded successfully!');

      // Trigger optional onSuccess callback
      if (onSuccess) {
        onSuccess();
      }

      return {
        ...res.data,
        fullUrl: `${cloudinaryBaseUrl}${data.public_id}`,
      };
    } catch (err) {
      message.error(err.response?.data?.error || err.message || 'Upload failed!');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading };
};

export default useAddTechStack;
