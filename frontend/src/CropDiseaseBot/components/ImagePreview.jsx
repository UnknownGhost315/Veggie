import React, { useEffect, useState } from 'react';
import './ImagePreview.css';

const ImagePreview = ({ image }) => {
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    if (!image) return;

    const url = URL.createObjectURL(image);
    setImageURL(url);

    // Clean up memory when component unmounts or image changes
    return () => URL.revokeObjectURL(url);
  }, [image]);

  if (!imageURL) return null;

  return (
    <div className="preview-container">
      <h3 className="preview-title">Preview:</h3>
      <img
        src={imageURL}
        alt="Preview"
        className="preview-image"
      />
    </div>
  );
};

export default ImagePreview;
