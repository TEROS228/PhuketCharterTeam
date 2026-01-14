import React, { lazy, Suspense } from 'react';
import Hero from "./Hero/Hero";
import PriceCalendar from './PriceCalendar';

// Lazy load компонентов, которые не видны сразу
const BookingProcess = lazy(() => import('./BookingProcess'));
const Fleet = lazy(() => import('./Fleet'));
const FoodMenu = lazy(() => import('./FoodMenu'));

const HomePage = () => {
  return (
    <main>
      <Hero />
      <PriceCalendar />
      <Suspense fallback={<div className="min-h-screen" />}>
        <BookingProcess />
        <Fleet />
        <FoodMenu />
      </Suspense>
    </main>
  );
};

export default HomePage;