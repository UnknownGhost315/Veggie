import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ChatbotIcon from './ChatbotIcon';
import ChatForm from './Chatform';
import ChatMessage from './ChatMessage';

import './Chatbot.css';

function Chatbot({ onStateChange }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState('idle');

  const generateBotResponse = async (history) => {
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    setIsTyping(true);
    setChatState('sending');
    onStateChange?.('sending');

    try {
      const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message || 'Something went wrong');

      const apiResponse = data.candidates[0].content.parts[0].text;
      setChatHistory((prev) => [...prev, { role: 'model', text: apiResponse }]);

      setChatState('received');
      onStateChange?.('received');

      setTimeout(() => {
        setChatState('idle');
        onStateChange?.('idle');
      }, 2000);
    } catch (err) {
      console.error(err);
      setChatState('idle');
      onStateChange?.('idle');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Leaves */}
      <motion.div
        className="floating-leaves"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ position: 'absolute', zIndex: 10 }}
      >
        <motion.img src="/leaves/leaf1.svg" className="leaf leaf1" alt="leaf1" whileHover={{ scale: 1.05 }} />
        <motion.img src="/leaves/leaf2.svg" className="leaf leaf2" alt="leaf2" whileHover={{ scale: 1.05 }} />
        <motion.img src="/leaves/leaf3.svg" className="leaf leaf3" alt="leaf3" whileHover={{ scale: 1.05 }} />
      </motion.div>

      {/* Chatbot UI */}
      <motion.div
        className="chatbot-popup"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 20 }}
      >
        {/* Chat Header */}
        <motion.div
          className="chat-header"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Veggie Diagnose AI</h2>
          </div>
          <button className="material-symbols-outlined">arrow_downward</button>
        </motion.div>

        {/* Chat Body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">Hey there<br />How can I help you today?</p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}

          {isTyping && (
            <div className="message bot-message typing-indicator">
              <ChatbotIcon />
              <p className="message-text">
                Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
              </p>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default Chatbot;
