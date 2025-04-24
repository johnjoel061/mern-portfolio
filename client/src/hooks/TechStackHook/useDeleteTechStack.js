import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const useDeleteTechStack = () => {
  const [loading, setLoading] = useState(false);

  const deleteTechStack = async (asset_id) => {
    if (!asset_id) {
      message.error('No asset ID provided for deletion!');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.delete(`http://localhost:3000/api/tech-stack/delete-image/${asset_id}`);
      message.success('Image deleted successfully!');
      return res.data;
    } catch (err) {
      message.error(err.response?.data?.error || 'Failed to delete image!');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTechStack, loading };
};

export default useDeleteTechStack;
