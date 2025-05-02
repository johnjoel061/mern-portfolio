import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const useAddSkill = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addSkill = async (skillName, skillDescription) => {
    if (!skillName || !skillDescription) {
      return setError('Skill name and description are required');
    }

    setLoading(true);
    try {
      // Send POST request to add a new skill
      const response = await axios.post(
        'https://mern-portfolio-backend-vnuz.onrender.com/api/talent/skill/add',
        { skillName, skillDescription },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        message.success(response.data.message || 'Skill added successfully');
        setError(null); // Reset error on success
      } else if (response.status === 400) {
        setError(response.data.message || 'Skill already exists');
      } else {
        message.error('Failed to add skill. Please try again.');
      }
    } catch (error) {
      // Handle specific error cases
      if (error.response && error.response.status === 400 && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
      message.error(`Add skill error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, addSkill };
};

export default useAddSkill;
