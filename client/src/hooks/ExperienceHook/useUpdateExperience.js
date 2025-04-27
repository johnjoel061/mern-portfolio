import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const useUpdateExperience = () => {
  const [loading, setLoading] = useState(false);

  const updateExperience = async (id, updatedData, onSuccess) => {
    setLoading(true);
    try {
      const response = await axios.put(`https://mern-portfolio-backend-ef1q.onrender.com/api/employment/experience/update/${id}`, updatedData);
      message.success("Experience updated successfully!");
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to update experience";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { updateExperience, loading };
};

export default useUpdateExperience;
