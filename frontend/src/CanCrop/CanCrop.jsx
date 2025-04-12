import React from "react";
import './index.css';
import Chatbot from './components/Chatbot';

function CanCrop() {
    return (
        <div className="can-crop-container">
            <h1 className="title">CanCrop AI Assistant</h1>
            <Chatbot />
        </div>
    );
}

export default CanCrop;
