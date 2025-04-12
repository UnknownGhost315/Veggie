import React from 'react';

const PredictionResult = ({ label, confidence }) => {
  if (!label) return null;
  console.log(label);
  console.log(confidence);

  return (
    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
      <h2>🧠 Prediction Result</h2>
      <p><strong>Disease:</strong> {label}</p>
      <p><strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%</p>
    </div>
  );
};

export default PredictionResult;
