import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const useUpdateSkill = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateSkill = async (id, skillName, skillDescription) => {
    if (!id || !skillName || !skillDescription) {
      return setError('ID, skill name, and description are required');
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `https://mern-portfolio-backend-ef1q.onrender.com/api/talent/skill/update/${id}`,
        { skillName, skillDescription },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        message.success(response.data.message || 'Skill updated successfully');
        setError(null); // Clear error on success
      } else {
        message.error('Failed to update skill. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
      message.error(`Update skill error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateSkill };
};

export default useUpdateSkill;
