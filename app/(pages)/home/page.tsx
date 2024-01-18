import ChatBot from '@/components/home/Chatbot';
import Contact from '@/components/home/contact';
import Hero from '@/components/home/hero';
import NewsView from '@/components/home/news-letter';
import React from 'react';

const Home = () => {
  return (
    <>
      <Hero />
      <Contact />
      <NewsView />
      {/* <ChatBot /> */}
    </>
  );
};

export default Home;
