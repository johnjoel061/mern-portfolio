import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const useAddEducation = () => {
  const [loading, setLoading] = useState(false);

  const addEducation = async (educationData, onSuccess) => {
    setLoading(true);
    try {
      const response = await axios.post("https://mern-portfolio-backend-vnuz.onrender.com/api/school/education/add", educationData);
      message.success("Education added successfully!");
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to add education";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { addEducation, loading };
};

export default useAddEducation;
