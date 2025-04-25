import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const useUpdateCertification = () => {
  const [loading, setLoading] = useState(false);

  const updateCertification = async (id, updatedData, onSuccess) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/recognition/certification/update/${id}`,
        updatedData
      );
      message.success("Certification updated successfully!");
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to update certification";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { updateCertification, loading };
};

export default useUpdateCertification;
