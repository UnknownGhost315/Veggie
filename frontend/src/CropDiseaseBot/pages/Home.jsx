import React, { useState,} from 'react';
import ImageUploader from '../components/ImageUploader';
import ImagePreview from '../components/ImagePreview';
import PredictionResult from '../components/PredictionResult';

const Home = ({ setLabel, setConfidence }) => {
  const [imageFile, setImageFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (file) => {
    setImageFile(file);
    setPrediction(null); // Clear previous result
    setLabel('');
    setConfidence(null);
  };

  const handlePredict = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Prediction failed.');
      }

      const data = await response.json();
      setPrediction(data);
      setLabel(data.label); // 👈 Pass to App
      setConfidence(data.confidence); // 👈 Pass to App
    } catch (err) {
      console.error(err);
      alert('Error predicting image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>🍅 VeggieDiagnose</h1>
      <ImageUploader onImageSelect={handleImageSelect} />
      <ImagePreview image={imageFile} />

      {imageFile && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={handlePredict}
            disabled={loading}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </div>
      )}

      {prediction && (
        <PredictionResult
          label={prediction.label}
          confidence={prediction.confidence}
        />
      )}
    </div>
  );
};

export default Home;
