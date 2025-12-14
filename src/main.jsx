import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initAnalytics } from './utils/analytics';

// Инициализируем отслеживание аналитики после загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
  initAnalytics();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);