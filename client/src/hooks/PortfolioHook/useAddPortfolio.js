import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const useAddPortfolio = () => {
  const [loading, setLoading] = useState(false);

  const addPortfolio = async (portfolioData, onSuccess) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/projects/portfolio/add", portfolioData);
      message.success("Portfolio project added successfully!");
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to add portfolio project";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { addPortfolio, loading };
};

export default useAddPortfolio;
