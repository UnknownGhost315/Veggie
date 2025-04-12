import React from 'react';
import ChatbotIcon from './ChatbotIcon';
import './ChatMessage.css'; // Add this for styling

function ChatMessage({ chat }) {
  const isBot = chat.role === 'model';

  return (
    <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`}>
      {isBot && <ChatbotIcon />}
      <div className={`message-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
        <p>{chat.text}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
