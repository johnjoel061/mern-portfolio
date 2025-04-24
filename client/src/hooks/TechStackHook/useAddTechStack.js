import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const useAddTechStack = (onSuccess) => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile); // 🔁 Use "image" instead of "file"

    try {
      setLoading(true);

      const res = await axios.post('http://localhost:3000/api/tech-stack/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (!res.data.url || !res.data.public_id) {
        throw new Error('Backend upload failed!');
      }

      message.success('Tech stack image uploaded successfully!');
      if (onSuccess) onSuccess();

      return res.data;
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
