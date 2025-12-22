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
        // Используем fawazahmed0/currency-api - самый точный курс (8 знаков после запятой)
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/thb.json');
        const data = await response.json();

        if (data.thb && data.thb.rub) {
          const rate = data.thb.rub;
          console.log('Exchange rate from API: 1 THB =', rate, 'RUB');
          console.log('Example: 40000 THB =', Math.floor(40000 * rate), 'RUB');
          setExchangeRate(rate);
        } else {
          // Fallback к open.er-api.com (6 знаков)
          const fallbackResponse = await fetch('https://open.er-api.com/v6/latest/THB');
          const fallbackData = await fallbackResponse.json();
          if (fallbackData.rates && fallbackData.rates.RUB) {
            setExchangeRate(fallbackData.rates.RUB);
          }
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
        // Используем точный фоллбэк курс
        setExchangeRate(2.563);
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
