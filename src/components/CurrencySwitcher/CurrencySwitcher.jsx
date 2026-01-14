import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import './CurrencySwitcher.css';

const CurrencySwitcher = () => {
  const { currency, toggleCurrency } = useCurrency();
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Загружаем состояние из localStorage
  useEffect(() => {
    const savedVisibility = localStorage.getItem('currencySwitcherVisible');
    const savedMinimized = localStorage.getItem('currencySwitcherMinimized');

    if (savedVisibility !== null) {
      setIsVisible(savedVisibility === 'true');
    }
    if (savedMinimized !== null) {
      setIsMinimized(savedMinimized === 'true');
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('currencySwitcherVisible', 'false');
  };

  const handleToggleMinimize = () => {
    const newMinimized = !isMinimized;
    setIsMinimized(newMinimized);
    localStorage.setItem('currencySwitcherMinimized', String(newMinimized));
  };

  const handleRestore = () => {
    setIsVisible(true);
    setIsMinimized(false);
    localStorage.setItem('currencySwitcherVisible', 'true');
    localStorage.setItem('currencySwitcherMinimized', 'false');
  };

  const setCurrency = (newCurrency) => {
    if (newCurrency !== currency) {
      toggleCurrency(newCurrency);
    }
  };

  // Если скрыто - показываем маленькую кнопку для восстановления
  if (!isVisible) {
    return (
      <button
        onClick={handleRestore}
        className="currency-restore-btn"
        aria-label="Показать переключатель валют"
        title="Показать переключатель валют"
      >
        💱
      </button>
    );
  }

  // Если минимизировано - показываем компактную версию
  if (isMinimized) {
    return (
      <div className="currency-minimized" onClick={handleToggleMinimize}>
        <span className="currency-minimized-text">
          {currency === 'THB' ? '฿' : '₽'}
        </span>
      </div>
    );
  }

  return (
    <div className="currency-card">
      <div className="currency-header">
        <div className="title">Currency</div>
        <div className="currency-controls">
          <button
            onClick={handleToggleMinimize}
            className="currency-control-btn"
            aria-label="Свернуть"
            title="Свернуть"
          >
            −
          </button>
          <button
            onClick={handleClose}
            className="currency-control-btn"
            aria-label="Закрыть"
            title="Закрыть"
          >
            ×
          </button>
        </div>
      </div>

      <div className="switch">
        <div
          className="slider"
          style={{
            transform: currency === 'RUB' ? 'translateX(100%)' : 'translateX(0)'
          }}
        />

        <span
          className={currency === 'THB' ? 'active' : ''}
          onClick={() => setCurrency('THB')}
        >
          THB&nbsp;฿
        </span>

        <span
          className={currency === 'RUB' ? 'active' : ''}
          onClick={() => setCurrency('RUB')}
        >
          RUB&nbsp;₽
        </span>
      </div>

      <div
        className="arrow"
        style={{
          transform: currency === 'RUB' ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
      >
        ⇄
      </div>

      <div className="info">
        <div>Current</div>
        <div className="value">
          {currency === 'THB' ? 'THB → RUB' : 'RUB → THB'}
        </div>
      </div>
    </div>
  );
};

export default CurrencySwitcher;
