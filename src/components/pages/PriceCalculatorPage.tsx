import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PriceCalculatorPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [duration, setDuration] = useState<1 | 2>(1);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [isOffSeason, setIsOffSeason] = useState(false);

  const getPriceForDate = (dateString: string, days: 1 | 2): number | null => {
    if (!dateString) return null;

    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();

    // Проверка на нерабочие месяцы (июнь-октябрь)
    if (month >= 6 && month <= 10) {
      return null;
    }

    // Цены для 1 дня
    const prices1Day: { [key: string]: number } = {
      'nov': 40000,      // 1 ноября - 30 ноября
      'dec1': 45000,     // 1 декабря - 25 декабря
      'dec2': 50000,     // 26 декабря - 31 декабря
      'jan1': 50000,     // 1 января - 15 января
      'jan2': 45000,     // 16 января - 31 января
      'feb': 45000,      // 1 февраля - 29 февраля
      'mar1': 45000,     // 1 марта
      'mar2': 40000,     // 2 марта - 31 марта
      'apr': 40000,      // апрель
      'may': 40000,      // май
    };

    // Цены для 2 дней
    const prices2Days: { [key: string]: number } = {
      'nov': 85000,
      'dec1': 95000,
      'dec2': 105000,
      'jan1': 105000,
      'jan2': 95000,
      'feb': 95000,
      'mar1': 95000,
      'mar2': 85000,
      'apr': 85000,
      'may': 85000,
    };

    const priceMap = days === 1 ? prices1Day : prices2Days;

    // Определяем период
    if (month === 11) {
      return priceMap['nov'];
    } else if (month === 12) {
      if (day <= 25) {
        return priceMap['dec1'];
      } else {
        return priceMap['dec2'];
      }
    } else if (month === 1) {
      if (day <= 15) {
        return priceMap['jan1'];
      } else {
        return priceMap['jan2'];
      }
    } else if (month === 2) {
      return priceMap['feb'];
    } else if (month === 3) {
      if (day === 1) {
        return priceMap['mar1'];
      } else {
        return priceMap['mar2'];
      }
    } else if (month === 4) {
      return priceMap['apr'];
    } else if (month === 5) {
      if (day === 1) {
        return priceMap['may'];
      }
      return priceMap['may'];
    }

    return null;
  };

  const handleCalculate = () => {
    if (!selectedDate) {
      alert('Пожалуйста, выберите дату');
      return;
    }

    const price = getPriceForDate(selectedDate, duration);

    if (price === null) {
      setIsOffSeason(true);
      setCalculatedPrice(null);
    } else {
      setIsOffSeason(false);
      setCalculatedPrice(price);
    }
  };

  const pricePeriods = [
    { period: '1 ноября - 30 ноября', price1Day: '40,000 ฿', price2Days: '85,000 ฿' },
    { period: '1 декабря - 25 декабря', price1Day: '45,000 ฿', price2Days: '95,000 ฿' },
    { period: '26 декабря - 15 января', price1Day: '50,000 ฿', price2Days: '105,000 ฿' },
    { period: '16 января - 1 марта', price1Day: '45,000 ฿', price2Days: '95,000 ฿' },
    { period: '2 марта - 1 июня', price1Day: '40,000 ฿', price2Days: '85,000 ฿' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="pt-20 sm:pt-24 pb-6">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 shadow-sm text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Назад на главную</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Калькулятор стоимости
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Рассчитайте стоимость аренды катамарана на выбранную дату
            </p>
          </div>

          {/* Калькулятор */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 mb-8">
            <div className="space-y-6">
              {/* Выбор продолжительности */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                  Продолжительность тура
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDuration(1)}
                    className={`px-6 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
                      duration === 1
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    1 День
                  </button>
                  <button
                    onClick={() => setDuration(2)}
                    className={`px-6 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ${
                      duration === 2
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    2 Дня
                  </button>
                </div>
              </div>

              {/* Выбор даты */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                  Выберите дату начала тура
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                />
              </div>

              {/* Кнопка расчета */}
              <button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Рассчитать стоимость
              </button>

              {/* Результат */}
              {calculatedPrice !== null && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                  <div className="text-center">
                    <p className="text-sm sm:text-base text-gray-600 mb-2">Стоимость аренды</p>
                    <p className="text-4xl sm:text-5xl font-bold text-green-600">
                      {calculatedPrice.toLocaleString()} ฿
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                      на {duration} {duration === 1 ? 'день' : 'дня'}
                    </p>
                  </div>
                </div>
              )}

              {isOffSeason && (
                <div className="mt-6 p-6 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-orange-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-lg sm:text-xl font-bold text-orange-600 mb-2">
                      Нерабочий сезон
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      Выбранная дата находится в нерабочем периоде (июнь - октябрь). Пожалуйста, выберите дату с ноября по май.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Таблица цен */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              Прайс-лист
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-base font-semibold text-gray-700">
                      Период
                    </th>
                    <th className="text-center py-3 px-2 sm:px-4 text-sm sm:text-base font-semibold text-gray-700">
                      1 День
                    </th>
                    <th className="text-center py-3 px-2 sm:px-4 text-sm sm:text-base font-semibold text-gray-700">
                      2 Дня
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricePeriods.map((period, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                    >
                      <td className="py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-700">
                        {period.period}
                      </td>
                      <td className="py-4 px-2 sm:px-4 text-center text-sm sm:text-base font-semibold text-blue-600">
                        {period.price1Day}
                      </td>
                      <td className="py-4 px-2 sm:px-4 text-center text-sm sm:text-base font-semibold text-blue-600">
                        {period.price2Days}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                <span className="font-semibold text-yellow-700">Обратите внимание:</span> С июня по октябрь - нерабочий сезон
              </p>
            </div>
          </div>

          {/* Кнопка связаться */}
          <div className="mt-8 text-center">
            <a
              href="https://wa.me/66854741566"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
              </svg>
              Забронировать через WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculatorPage;
