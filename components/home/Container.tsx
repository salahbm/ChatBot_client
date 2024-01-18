// ChatContainer.tsx
'use client';
import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import Chatbot from './Chatbot';

const ChatContainer: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleToggleChat = (): void => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed right-4 bottom-24 ">
      {isChatOpen ? (
        <Chatbot toggle={handleToggleChat} />
      ) : (
        <button
          className="mb-4 px-3 py-2 bg-orange-600 text-white rounded-md animate-pulse "
          onClick={handleToggleChat}
        >
          <Bot />
        </button>
      )}
    </div>
  );
};

export default ChatContainer;
