import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const useAddCertification = () => {
  const [loading, setLoading] = useState(false);

  const addCertification = async (certificationData, onSuccess) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://mern-portfolio-backend-vnuz.onrender.com/api/recognition/certification/add",
        certificationData
      );
      message.success("Certification added successfully!");
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to add certification";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { addCertification, loading };
};

export default useAddCertification;
