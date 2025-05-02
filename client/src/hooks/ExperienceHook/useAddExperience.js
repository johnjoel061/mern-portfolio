import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const useAddExperience = () => {
  const [loading, setLoading] = useState(false);

  const addExperience = async (experienceData, onSuccess) => {
    setLoading(true);
    try {
      const response = await axios.post("https://mern-portfolio-backend-vnuz.onrender.com/api/employment/experience/add", experienceData);
      message.success("Experience added successfully!");
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to add experience";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { addExperience, loading };
};

export default useAddExperience;
