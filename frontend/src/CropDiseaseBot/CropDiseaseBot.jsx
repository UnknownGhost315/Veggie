import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Chatbot from './components/Chatbot';
import './styles.css';

function CropDiseaseBot() {
  const [label, setLabel] = useState('');
  const [confidence, setConfidence] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } },
  };

  return (
    <motion.div
      className="crop min-h-screen p-6 bg-gradient-to-br from-green-100 via-lime-100 to-lime-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-center text-green-800 mb-14 drop-shadow-lg"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        🌿 Crop Disease Detector
      </motion.h1>

      {/* Home Section */}
      <motion.div
        className="mb-16"
        variants={sectionVariants}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <Home setLabel={setLabel} setConfidence={setConfidence} />
      </motion.div>

      {/* Chatbot Section */}
      <AnimatePresence>
        {label && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100 }}
          >
            <Chatbot label={label} confidence={confidence} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CropDiseaseBot;
