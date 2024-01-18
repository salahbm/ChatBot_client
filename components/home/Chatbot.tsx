'use client';
import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') {
      return;
    }

    // Update state with the new message
    setMessages([...messages, { text: input, user: true }]);

    // Clear the input field
    setInput('');
  };

  return (
    <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full mt-2 space-x-3 max-w-xs ${
              message.user ? 'ml-auto justify-end' : ''
            }`}
          >
            <div>
              <div
                className={`${
                  message.user
                    ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg'
                    : 'bg-gray-300 rounded-r-lg rounded-bl-lg'
                } p-3`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
            {!message.user && (
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-300 p-4">
        <input
          className="flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          placeholder="Type your message…"
          value={input}
          onChange={handleInputChange}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
