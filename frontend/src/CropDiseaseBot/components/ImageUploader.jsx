import React, { useState } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ onImageSelect }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <div className="uploader-container">
      <div
        className={`upload-box ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleFileChange}
          hidden
        />
        <label htmlFor="file-upload" className="upload-label">
          <div className="upload-icon">
            📷
          </div>
          <p>
            Drag & Drop your <strong>leaf</strong> image here,
            <br />
            or <span className="browse">browse</span> to upload
          </p>
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
