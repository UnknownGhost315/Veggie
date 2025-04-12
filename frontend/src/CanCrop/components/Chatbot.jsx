import React, { useState } from "react";
import ChatbotIcon from './ChatbotIcon';
import ChatForm from './Chatform';
import ChatMessage from './ChatMessage';
import './Chatbot.css';

const API_KEY = "Gfc7H5EgjktUqqIrmlm6ar3dTZG8sTv6";

function Chatbot() {
  const [city, setCity] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      text: "Hey there! 🌾 How can I help you today?"
    }
  ]);

  const handleChange = (e) => setCity(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    try {
      // Step 1: Fetch location key
      const locationRes = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`
      );
      const locationData = await locationRes.json();

      if (!locationData.length) {
        setChatHistory(prev => [...prev, { role: "model", text: `❌ Could not find weather info for "${city}". Please try another location.` }]);
        return;
      }

      const locationKey = locationData[0].Key;

      // Step 2: Get 1-day forecast
      const forecastRes = await fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      const { Category, Severity, Text, EffectiveDate } = forecastData.Headline;

      // Step 3: Create user prompt for the bot
      const userPrompt = `🌦️ Weather forecast for ${city} on ${EffectiveDate}:\n• Category: ${Category}\n• Severity: ${Severity}\n• Summary: ${Text}\n\n👨‍🌾 As a farming assistant, suggest suitable crops for this weather and precautions farmers should take.`;

      const updatedChat = [
        ...chatHistory,
        { role: "user", text: userPrompt }
      ];

      setChatHistory(updatedChat);
      generateBotResponse(updatedChat);
    } catch (err) {
      console.error("Error fetching weather or responding:", err);
      setChatHistory(prev => [...prev, { role: "model", text: "⚠️ Something went wrong while fetching weather data. Please try again." }]);
    }
  };

  const generateBotResponse = async (history) => {
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }]
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory })
    };

    try {
      const response = await fetch(process.env.REACT_APP_API_URL, requestOptions);
      const data = await response.json();

      const apiResponse = data.candidates[0].content.parts[0].text;
      setChatHistory(prev => [...prev, { role: "model", text: apiResponse }]);
    } catch (err) {
      console.error("Bot error:", err);
      setChatHistory(prev => [...prev, { role: "model", text: "🧠 Bot couldn't respond. Please try again later." }]);
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="app-title">🌱 Veggie Diagnose AI</h1>

      <form onSubmit={handleSubmit} className="city-form">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter your city..."
          className="city-input"
        />
        <button type="submit" className="weather-btn">Check Weather</button>
      </form>

      <div className="chatbot-card">
        <div className="chat-header">
          <div className="chat-header-content">
            <ChatbotIcon />
            <h2>Veggie Diagnose AI</h2>
          </div>
        </div>

        <div className="chat-body">
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
