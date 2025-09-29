import React from 'react';
import Hero from "./Hero/Hero";
import PriceCalendar from './PriceCalendar';
import Fleet from './Fleet';
import FoodMenu from './FoodMenu';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <PriceCalendar />
      <Fleet />
      <FoodMenu />
    </main>
  );
};

export default HomePage;