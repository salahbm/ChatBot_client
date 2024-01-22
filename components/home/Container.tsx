// ChatContainer.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Bot, XOctagon } from 'lucide-react';
import Chatbot from './Chatbot';

const ChatContainer: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const handleToggleChat = (): void => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed right-4 bottom-24 ">
      {isChatOpen ? (
        <>
          <button
            className=" p-1 bg-orange-600 text-white rounded-md "
            onClick={handleToggleChat}
          >
            <XOctagon />
          </button>
          <Chatbot />
        </>
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
