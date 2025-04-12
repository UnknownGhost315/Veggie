import React from 'react';
import ChatbotIcon from './ChatbotIcon';

function ChatMessage({ chat }) {
  const isBot = chat.role === 'model';

  return (
    <div className={`message ${isBot ? 'bot' : 'user'}-message`}>
      {isBot && <ChatbotIcon />}
      <p className="message-text">
        {chat.text}
      </p>
    </div>
  );
}

export default ChatMessage;
