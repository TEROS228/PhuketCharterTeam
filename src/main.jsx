import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initAnalytics } from './utils/analytics';
import { CurrencyProvider } from './context/CurrencyContext';

// Инициализируем отслеживание аналитики после загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
  initAnalytics();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </BrowserRouter>
  </React.StrictMode>
);