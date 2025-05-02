import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const useUpdatePortfolio = () => {
  const [loading, setLoading] = useState(false);

  const updatePortfolio = async (id, updatedData, onSuccess) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `https://mern-portfolio-backend-vnuz.onrender.com/api/projects/portfolio/update/${id}`,
        updatedData
      );
      message.success("Portfolio project updated successfully!");
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to update portfolio project";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { updatePortfolio, loading };
};

export default useUpdatePortfolio;
