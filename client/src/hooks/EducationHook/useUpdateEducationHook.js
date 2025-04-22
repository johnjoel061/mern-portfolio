import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const useUpdateEducation = () => {
  const [loading, setLoading] = useState(false);

  const updateEducation = async (id, updatedData, onSuccess) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3000/api/school/education/update/${id}`, updatedData);
      message.success("Education updated successfully!");
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Failed to update education";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { updateEducation, loading };
};

export default useUpdateEducation;
