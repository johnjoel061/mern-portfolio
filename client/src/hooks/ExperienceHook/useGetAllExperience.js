import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true); // Ensure loading state is true when refetching
    try {
      const response = await axios.get('https://mern-portfolio-backend-ef1q.onrender.com/api/employment/experience/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setExperiences(response.data.data);
      setError(null); // Clear previous errors on success
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const refetchExperiences = async () => {
    await fetchExperiences();
  };

  return { experiences, loading, error, refetchExperiences };
};

export default useFetchExperiences;


