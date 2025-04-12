import React, { useRef } from 'react';
import './ChatForm.css'; // New CSS file for styling

function ChatForm({ chatHistory, setChatHistory, generateBotResponse }) {
  const inputRef = useRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const userMsg = inputRef.current.value.trim();

    if (!userMsg) return;
    inputRef.current.value = '';

    // Add user message to history
    setChatHistory((prev) => [...prev, { role: 'user', text: userMsg }]);

    // Trigger bot response
    setTimeout(() => {
      generateBotResponse([
        ...chatHistory,
        { role: 'user', text: userMsg }
      ]);
    }, 100);
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Type your message..."
        className="chat-input"
        ref={inputRef}
        required
      />
      <button type="submit" className="send-btn" aria-label="Send message">
        <span className="material-symbols-outlined">send</span>
      </button>
    </form>
  );
}

export default ChatForm;
