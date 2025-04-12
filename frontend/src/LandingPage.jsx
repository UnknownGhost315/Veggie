import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const tools = [
    {
      title: 'Crop Disease Bot',
      description: 'Upload a plant leaf image to detect diseases and get treatment advice instantly.',
      image: '/cro_disease.png',
      path: '/CropDiseaseBot',
    },
    {
      title: 'General Bot',
      description: 'Chat with our smart AI assistant for general queries and farming tips.',
      image: '/general_bot.png',
      path: '/GeneralBot',
    },
    {
      title: 'CanCrop',
      description: 'Find out which crops are best suited for your region and current weather.',
      image: '/can_crop.png',
      path: '/CanCrop',
    },
  ];

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #e6f4ea, #ffffff)',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '36px',
    color: '#2f855a',
    fontWeight: 'bold',
    marginBottom: '60px',
  };

  const sectionStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '60px',
    justifyContent: 'space-between',
  };

  const reverseStyle = {
    flexDirection: 'row-reverse',
  };

  const imageStyle = {
    width: '400px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #ccc',
    cursor: 'pointer',
  };

  const infoStyle = {
    flex: 1,
    marginLeft: '40px',
    marginRight: '40px',
  };

  const toolTitleStyle = {
    fontSize: '24px',
    color: '#2f855a',
    fontWeight: 'bold',
    marginBottom: '12px',
  };

  const descriptionStyle = {
    fontSize: '16px',
    color: '#333',
    lineHeight: '1.6',
  };

  const footerStyle = {
    textAlign: 'center',
    fontSize: '14px',
    color: '#777',
    marginTop: '80px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🌿 Welcome to Veggie Diagnose AI</h1>

      {tools.map((tool, index) => (
        <div
          key={index}
          style={{
            ...sectionStyle,
            ...(index % 2 === 1 ? reverseStyle : {}),
          }}
        >
          <Link to={tool.path}>
            <img src={tool.image} alt={tool.title} style={imageStyle} />
          </Link>
          <div style={infoStyle}>
            <h2 style={toolTitleStyle}>{tool.title}</h2>
            <p style={descriptionStyle}>{tool.description}</p>
          </div>
        </div>
      ))}

      <footer style={footerStyle}>
        © 2025 Veggie Diagnose AI. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
