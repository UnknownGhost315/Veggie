import React, { useRef } from 'react';

function ChatForm({ chatHistory, setChatHistory, generateBotResponse }) {
  const inputRef = useRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const userMsg = inputRef.current.value.trim();

    if (!userMsg) return;
    inputRef.current.value = '';

    // Update chat history with user's message
    setChatHistory((prev) => [...prev, { role: 'user', text: userMsg }]);

    // Call the bot response generator after a slight delay
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
        placeholder="Message..."
        className="message-input"
        ref={inputRef}
        required
      />
      <button type="submit" className="material-symbols-outlined">
        arrow_upward
      </button>
    </form>
  );
}

export default ChatForm;
