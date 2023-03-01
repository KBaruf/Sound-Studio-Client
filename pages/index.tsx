import BestSelling from '@/components/BestSelling';
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import Navbar from '../components/Navbar';
const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <BestSelling />
    </div>
  );
};

export default Home;
