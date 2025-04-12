import React from 'react';
import Chatbot from './components/Chatbot';
import { motion } from 'framer-motion';

const GeneralBot = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100 to-emerald-200 flex flex-col">
      {/* Header */}
      <header className="w-full p-4 bg-white shadow-md z-10">
        <h1 className="text-2xl font-bold text-green-800 text-center">
          🌾 General Farming Assistant
        </h1>
      </header>

      {/* Chat Area */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-4"
      >
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
          <Chatbot />
        </div>
      </motion.main>

      {/* Footer (optional) */}
      <footer className="text-center text-sm text-green-900 py-2">
        &copy; {new Date().getFullYear()} VeggieVision. Helping farmers grow smarter.
      </footer>
    </div>
  );
};

export default GeneralBot;

