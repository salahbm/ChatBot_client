import ChatContainer from '@/components/home/Container';
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
      <ChatContainer />
    </>
  );
};

export default Home;
