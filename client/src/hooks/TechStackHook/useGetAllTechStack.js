import { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

const useGetAllTechStack = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const cloudinaryBaseUrl = "https://res.cloudinary.com/duifaweje/image/upload/";

  const fetchTechStack = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/api/tech-stack/all-images');
      const imagesWithFullUrls = res.data.map(image => ({
        ...image,
        fullUrl: `${cloudinaryBaseUrl}${image.public_id}`, // Prepend base URL to public_id
      }));
      setImages(imagesWithFullUrls);
      message.success('Images fetched successfully!');
    } catch (err) {
      message.error(err.response?.data?.error || 'Failed to fetch images!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechStack();
  }, []);

  return { images, loading, refetch: fetchTechStack };
};

export default useGetAllTechStack;
