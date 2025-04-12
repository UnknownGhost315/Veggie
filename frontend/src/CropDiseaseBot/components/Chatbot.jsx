import React, { useState, useEffect, useRef } from 'react';
import ChatbotIcon from './ChatbotIcon';
import ChatMessage from './ChatMessage';

function Chatbot({ label, confidence }) {
  const [chatHistory, setChatHistory] = useState([]);
  const hasFetchedRef = useRef(false); // Prevents double API call

  const generateBotResponse = async (prompt) => {
    const formattedHistory = [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ];

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory })
    };

    try {
      const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message || "Something went wrong");

      const apiResponse = data.candidates[0].content.parts[0].text;
      console.log(apiResponse);

      setChatHistory(prev => [
        ...prev,
        { role: "user", text: prompt },
        { role: "model", text: apiResponse }
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (label && confidence !== null && !hasFetchedRef.current) {
      hasFetchedRef.current = true;

      // 👉 Handle Notaleaf
      if (label.toLowerCase() === "notaleaf") {
        const message = `⚠️ This doesn't appear to be a valid leaf. Please upload a clear image of a plant leaf for analysis.`;
        setChatHistory(prev => [
          ...prev,
          { role: "model", text: message }
        ]);
        return;
      }

      // 👉 Revised prompt for cleaner response
      const prompt = `A plant has been diagnosed with "${label}" with ${(confidence * 100).toFixed(2)}% confidence.

Please respond in **clean plain text only**. Use bold section headings, and avoid using asterisks or markdown symbols before each bullet. Do not include any introduction or explanation. Structure it as:

**Precautions**
- List what farmers should do to prevent disease spread.

**Medications**
- List treatments or medications that can be used.

**Where to Buy**
- List 2 or 3 random online platforms where farmers can buy these items (e.g., Amazon India, Ugaoo, BigHaat, AgriBegri).`;

      console.log("Prompt sent to Gemini:", prompt);
      generateBotResponse(prompt);
    }
  }, [label, confidence]);

  return (
    <div className="container">
      <div className="chatbot-popup">
        {/* Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Veggie Diagnose AI</h2>
          </div>
          <button className="material-symbols-outlined">
            arrow_downward
          </button>
        </div>

        {/* Chat messages */}
        <div className="chat-body">
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Footer */}
        <div className="chat-footer text-gray-500 text-sm text-center py-2">
          Upload a plant image above to receive a diagnosis and advice.
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
