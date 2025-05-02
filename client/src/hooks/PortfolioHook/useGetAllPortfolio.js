import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchPortfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolios = useCallback(async () => {
    setLoading(true); // Ensure loading state is true when refetching
    try {
      const response = await axios.get('https://mern-portfolio-backend-vnuz.onrender.com/api/projects/portfolio/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPortfolios(response.data.data);
      setError(null); // Clear previous errors on success
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const refetchPortfolios = async () => {
    await fetchPortfolios();
  };

  return { portfolios, loading, error, refetchPortfolios };
};

export default useFetchPortfolios;
