import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'THB';
  });
  const [exchangeRate, setExchangeRate] = useState(2.5); // THB to RUB по умолчанию

  // Получаем текущий курс при загрузке
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/THB');
        const data = await response.json();
        if (data.rates && data.rates.RUB) {
          setExchangeRate(data.rates.RUB);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        // Используем фоллбэк курс
        setExchangeRate(2.5);
      }
    };

    fetchExchangeRate();
  }, []);

  // Сохраняем выбор валюты
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const convertPrice = (priceInTHB) => {
    const numericPrice = typeof priceInTHB === 'string'
      ? parseInt(priceInTHB.replace(/[^\d]/g, ''))
      : priceInTHB;

    if (currency === 'RUB') {
      // Точная конвертация без округления
      return numericPrice * exchangeRate;
    }
    return numericPrice;
  };

  const formatPrice = (priceInTHB) => {
    const converted = convertPrice(priceInTHB);
    // Для рублей показываем без копеек, но точное значение
    const displayAmount = currency === 'RUB'
      ? Math.floor(converted).toLocaleString('ru-RU')
      : converted.toLocaleString('ru-RU');

    return {
      amount: displayAmount,
      symbol: currency === 'THB' ? '฿' : '₽',
      currency: currency
    };
  };

  const toggleCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      toggleCurrency,
      formatPrice,
      convertPrice,
      exchangeRate
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};
