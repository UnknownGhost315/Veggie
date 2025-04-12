import { motion } from 'framer-motion';
import ChatbotIcon from './ChatbotIcon';

function ChatMessage({ chat }) {
  const isBot = chat.role === 'model';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`message ${isBot ? 'bot' : 'user'}-message`}
    >
      {isBot && <ChatbotIcon />}
      <p className="message-text">
        {chat.text}
      </p>
    </motion.div>
  );
}

export default ChatMessage;

