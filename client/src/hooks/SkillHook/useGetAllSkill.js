import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true); // Ensure loading state is true when refetching
    try {
      const response = await axios.get('http://localhost:3000/api/talent/skill/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSkills(response.data.data);
      setError(null); // Clear previous errors on success
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const refetchSkills = async () => {
    await fetchSkills();
  };

  return { skills, loading, error, refetchSkills };
};

export default useFetchSkills;
