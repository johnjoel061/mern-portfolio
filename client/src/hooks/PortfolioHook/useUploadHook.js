import React, { useState } from 'react';
import axios from 'axios';

const UploadHook = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('/api/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(`Image uploaded! URL: ${res.data.url}`);
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {preview && <img src={preview} alt="preview" width={200} />}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadHook;
