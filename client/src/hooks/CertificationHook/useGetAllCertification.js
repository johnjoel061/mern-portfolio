import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCertifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://mern-portfolio-backend-vnuz.onrender.com/api/recognition/certification/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCertifications(response.data.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  const refetchCertifications = async () => {
    await fetchCertifications();
  };

  return { certifications, loading, error, refetchCertifications };
};

export default useFetchCertifications;
