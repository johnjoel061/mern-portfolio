import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEducation = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://mern-portfolio-backend-ef1q.onrender.com/api/school/education/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEducation(response.data.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  const refetchEducation = async () => {
    await fetchEducation();
  };

  return { education, loading, error, refetchEducation };
};

export default useFetchEducation;
