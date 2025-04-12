import React from 'react';
import CropDiseaseBot from './CropDiseaseBot/CropDiseaseBot';
import GeneralBot from './GeneralBot/GeneralBot';
import CanCrop from './CanCrop/CanCrop';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Navbar.css'; // link to the CSS
import LandingPage from './LandingPage';
import AboutUs from './AboutUs';

function Navbar() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="navbar-title"><Link to="/LandingPage" className='nav-link'>🤖 <span style={{"color":" Blue"}}>Veggie</span>-Diagnose<span style={{"color":"black"}}>.AI</span></Link></div>
          <div className="navbar-links">
            <Link to="/CropDiseaseBot" className="nav-link">Crop Disease Bot</Link>
            <Link to="/GeneralBot" className="nav-link">General Bot</Link>
            <Link to="/CanCrop" className="nav-link">CanCrop Bot</Link>
            <Link to="/LandingPage" className="nav-link">Home</Link>
            <Link to="/AboutUs" className="nav-link">About us</Link>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/CropDiseaseBot" element={<CropDiseaseBot />} />
            <Route path="/GeneralBot" element={<GeneralBot />} />
            <Route path="/CanCrop" element={<CanCrop />} />
            <Route path="/LandingPage" element={<LandingPage />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Navbar;
