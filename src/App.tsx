import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Astrea42Page from './components/pages/Astrea42Page';
import Lucia40Page from './components/pages/Lucia40Page';
import RoutesPage from './components/pages/RoutesPage';
import RouteDetailPage from './components/pages/RouteDetailPage';
import PriceCalculatorPage from './components/pages/PriceCalculatorPage';
import PrivacyPolicyPage from './components/pages/PrivacyPolicyPage';
import FoodMenu from './components/FoodMenu';
import SuccessPage from './components/SuccessPage';
import { useSmoothScroll } from './hooks/useSmoothScroll';

const FleetPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Наш флот</h1>
      <p className="text-xl text-gray-600">Страница с катамаранами скоро будет готова!</p>
    </div>
  </div>
);

const BookingPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Бронирование</h1>
      <p className="text-xl text-gray-600">Страница бронирования скоро будет готова!</p>
    </div>
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Отправляем событие просмотра страницы в Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: pathname,
          title: document.title,
          url: window.location.href
        }
      });
    }
  }, [pathname]);

  return null;
}

function App() {
  useSmoothScroll();
  
  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/route/:id" element={<RouteDetailPage />} />
          <Route path="/calculator" element={<PriceCalculatorPage />} />
          <Route path="/food-menu" element={<FoodMenu />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/catamaran/astrea-42" element={<Astrea42Page />} />
          <Route path="/catamaran/lucia-40" element={<Lucia40Page />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;