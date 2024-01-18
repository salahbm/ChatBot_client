'use client';

// components/ChatBot.js
import { useState } from 'react';
import responses from '@/constants/response.json';

const ChatBot = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [marketingRequirement, setMarketingRequirement] = useState('');
  const [showSalesMessage, setShowSalesMessage] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [botMessages, setBotMessages] = useState([responses.welcomeMessage]);

  const addBotMessage = (message: string) => {
    setBotMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleOptionSelection = (option: any) => {
    setMarketingRequirement(option);
    if (option === 'Yes') {
      setShowSalesMessage(true);
      addBotMessage(responses.salesQuestion);
    }
  };

  const handleSendMessage = () => {
    // Handle user message
    addBotMessage(`User: ${userMessage}`);

    // Implement the logic to send user information to the backend
    // and store it in the MongoDB database.
    console.log('User Information:', {
      name: userName,
      email: userEmail,
      phone: userPhone,
      marketingRequirement,
    });

    // You can make an API call to the Django backend here.

    // Reset the form after storing information
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setMarketingRequirement('');
    setShowSalesMessage(false);

    // Reset user message input
    setUserMessage('');

    // Simulate Bot Response
    addBotMessage(`BOT: ${responses.nameQuestion}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-100 rounded-md shadow-md">
      {/* Chat Messages */}
      <div className="mb-4">
        {botMessages.map((message, index) => (
          <div key={index} className="text-gray-700 mb-2">
            {message}
          </div>
        ))}
      </div>

      {/* User Input Form */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Your message..."
          className="flex-1 p-2 border rounded-md mr-2"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
