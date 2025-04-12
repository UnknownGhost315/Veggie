import React from 'react';

const AboutUs = () => {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #f0fff4, #ffffff)',
    padding: '60px 40px',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#2d3748',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const titleStyle = {
    fontSize: '40px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#2f855a',
    textAlign: 'center',
  };

  const subtitleStyle = {
    fontSize: '20px',
    color: '#4a5568',
    marginBottom: '40px',
    maxWidth: '800px',
    textAlign: 'center',
  };

  const sectionStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '40px',
    marginBottom: '30px',
    maxWidth: '900px',
    width: '100%',
    textAlign: 'left',
  };

  const sectionTitle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2f855a',
    marginBottom: '12px',
  };

  const paragraph = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#444',
  };

  const footerStyle = {
    fontSize: '14px',
    marginTop: '60px',
    color: '#718096',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>About Veggie Diagnose AI 🌾</h1>
      <p style={subtitleStyle}>
        Empowering farmers with technology — our mission is to make smart, accessible farming solutions that help grow healthier crops, increase yields, and reduce disease impact.
      </p>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>🌱 Our Mission</h2>
        <p style={paragraph}>
          We believe every farmer deserves access to intelligent tools. At Veggie Diagnose AI, we harness artificial intelligence and weather data to help farmers detect crop diseases early, receive tailored medication advice, and make better planting decisions.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>🤖 What We Offer</h2>
        <p style={paragraph}>
          From uploading a single leaf image to getting full disease diagnostics and treatment options — our AI bots are built to assist with simplicity and speed. Our CanCrop tool also recommends the best crops based on real-time weather conditions.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>🌍 Our Vision</h2>
        <p style={paragraph}>
          We're building a future where every farmer — big or small — can make data-driven decisions without needing a degree in science. With the right tech in hand, farming can be smarter, safer, and more sustainable.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitle}>👨‍🌾 Made for Farmers</h2>
        <p style={paragraph}>
          Whether you're battling leaf spot, wondering what to plant next season, or just need advice, our app is your digital companion in the field. Simple. Reliable. Built with care for those who feed the world.
        </p>
      </div>

      <p style={footerStyle}>© 2025 Veggie Diagnose AI. Growing better, together.</p>
    </div>
  );
};

export default AboutUs;
