import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

// Компонент для автоматической конвертации и отображения цен
const Price = ({ amount, className = '' }) => {
  const { formatPrice } = useCurrency();

  // Парсим числа из строк типа "40,000" или "40000"
  const numericAmount = typeof amount === 'string'
    ? parseInt(amount.replace(/[^\d]/g, ''))
    : amount;

  const formattedPrice = formatPrice(numericAmount);

  return (
    <span className={className}>
      {formattedPrice.amount} {formattedPrice.symbol}
    </span>
  );
};

export default Price;
