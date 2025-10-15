import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PriceCalculatorPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [catamaran, setCatamaran] = useState<'astrea42' | 'lucia40'>('astrea42');
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [isOffSeason, setIsOffSeason] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Новые параметры
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [needFood, setNeedFood] = useState<boolean>(false);
  const [needChef, setNeedChef] = useState<boolean>(false);
  const [groceriesAmount, setGroceriesAmount] = useState<string>('');

  // Вычисляем максимальное количество гостей в зависимости от длительности
  const getMaxGuests = (): number => {
    if (!startDate || !endDate) return 15;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    return numberOfDays === 1 ? 15 : 12;
  };

  // Автоматически корректируем количество гостей при изменении дат
  React.useEffect(() => {
    const maxGuests = getMaxGuests();
    if (numberOfPeople > maxGuests) {
      setNumberOfPeople(maxGuests);
    }
  }, [startDate, endDate]);


  const getDailyPriceForDate = (date: Date): number | null => {
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();
    const year = date.getFullYear();

    // Проверка на нерабочие месяцы (июнь-сентябрь)
    if (month >= 6 && month <= 9) {
      return null;
    }

    // Создаем объект даты для сравнения
    const checkDate = new Date(year, month - 1, day);

    // Nov 1st - Nov 30th: 40000
    const nov1 = new Date(year, 10, 1);
    const nov30 = new Date(year, 10, 30);
    if (checkDate >= nov1 && checkDate <= nov30) {
      return 40000;
    }

    // Dec 1st - Dec 25th: 45000
    const dec1 = new Date(year, 11, 1);
    const dec25 = new Date(year, 11, 25);
    if (checkDate >= dec1 && checkDate <= dec25) {
      return 45000;
    }

    // Dec 26th - Jan 15th: 50000 (нужно учитывать переход года)
    const dec26 = new Date(year, 11, 26);
    const dec31 = new Date(year, 11, 31);
    const jan1 = new Date(year, 0, 1);
    const jan15 = new Date(year, 0, 15);
    if ((checkDate >= dec26 && checkDate <= dec31) || (checkDate >= jan1 && checkDate <= jan15)) {
      return 50000;
    }

    // Jan 16th - Mar 1st: 45000
    const jan16 = new Date(year, 0, 16);
    const mar1 = new Date(year, 2, 1);
    if (checkDate >= jan16 && checkDate <= mar1) {
      return 45000;
    }

    // Mar 2nd - Jun 1st: 40000
    const mar2 = new Date(year, 2, 2);
    const jun1 = new Date(year, 5, 1);
    if (checkDate >= mar2 && checkDate <= jun1) {
      return 40000;
    }

    // Oct 1st - Oct 31st: 40000 (добавим октябрь)
    const oct1 = new Date(year, 9, 1);
    const oct31 = new Date(year, 9, 31);
    if (checkDate >= oct1 && checkDate <= oct31) {
      return 40000;
    }

    return null;
  };

  const calculateTotalPrice = (start: string, end: string): number | null => {
    if (!start || !end) return null;

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    // Проверка корректности дат (дата окончания должна быть >= даты начала)
    if (startDateObj > endDateObj) {
      return null;
    }

    // Подсчитываем количество дней ВКЛЮЧИТЕЛЬНО (с 14 по 15 = 2 дня)
    const diffTime = endDateObj.getTime() - startDateObj.getTime();
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Проверка: доступны только 1, 2, 3 или 7 дней
    if (numberOfDays !== 1 && numberOfDays !== 2 && numberOfDays !== 3 && numberOfDays !== 7) {
      return null;
    }

    // Подсчитываем сумму за все дни
    let totalPrice = 0;
    let currentDate = new Date(startDateObj);

    while (currentDate <= endDateObj) {
      const dailyPrice = getDailyPriceForDate(currentDate);

      if (dailyPrice === null) {
        // Если хотя бы один день попадает на нерабочий сезон
        return null;
      }

      totalPrice += dailyPrice;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Добавляем стоимость ночей (каждая ночь = 5000)
    // Количество ночей = количество дней - 1
    const numberOfNights = numberOfDays - 1;
    const nightsCost = numberOfNights * 5000;

    return totalPrice + nightsCost;
  };

  const handleCalculate = () => {
    setErrorMessage('');
    setIsOffSeason(false);
    setCalculatedPrice(null);

    if (!startDate || !endDate) {
      setErrorMessage('Пожалуйста, выберите даты начала и окончания');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setErrorMessage('Дата окончания должна быть не раньше даты начала');
      return;
    }

    // Проверяем количество дней
    const diffTime = end.getTime() - start.getTime();
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (numberOfDays !== 1 && numberOfDays !== 2 && numberOfDays !== 3 && numberOfDays !== 7) {
      setErrorMessage(`Доступны только туры на 1 день/0 ночей, 2 дня/1 ночь, 3 дня/2 ночи или 7 дней/6 ночей. Вы выбрали ${numberOfDays} ${numberOfDays === 4 || numberOfDays === 5 || numberOfDays === 6 ? 'дней' : numberOfDays === 1 ? 'день' : 'дня'}.`);
      return;
    }

    let basePrice = calculateTotalPrice(startDate, endDate);

    if (basePrice === null) {
      setIsOffSeason(true);
      return;
    }

    // Добавляем стоимость питания
    let foodCost = 0;
    if (needFood) {
      foodCost = 500 * numberOfPeople * numberOfDays;
      basePrice += foodCost;
    }

    // Добавляем стоимость повара (только для 2, 3, 7 дней)
    let chefCost = 0;
    if (needChef && (numberOfDays === 2 || numberOfDays === 3 || numberOfDays === 7)) {
      chefCost = 4000 * numberOfDays;
      basePrice += chefCost;
    }

    // Добавляем стоимость продуктов по чеку
    const groceriesCost = groceriesAmount ? parseFloat(groceriesAmount) : 0;
    if (groceriesCost > 0) {
      basePrice += groceriesCost;
    }

    setCalculatedPrice(basePrice);
  };

  const pricePeriods = [
    { period: '1 ноября - 30 ноября', pricePerDay: '40,000 ฿' },
    { period: '1 декабря - 25 декабря', pricePerDay: '45,000 ฿' },
    { period: '26 декабря - 15 января', pricePerDay: '50,000 ฿' },
    { period: '16 января - 1 марта', pricePerDay: '45,000 ฿' },
    { period: '2 марта - 1 июня', pricePerDay: '40,000 ฿' },
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
              {/* Выбор катамарана */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                  Выберите катамаран
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setCatamaran('astrea42')}
                    className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      catamaran === 'astrea42'
                        ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                        catamaran === 'astrea42' ? 'border-blue-600' : 'border-gray-300'
                      }`}>
                        {catamaran === 'astrea42' && (
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Astrea 42</h3>
                        <p className="text-sm text-gray-600 mt-1">42 фута • До 10 гостей</p>
                        <p className="text-xs text-gray-500 mt-2">4 каюты • 4 санузла</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setCatamaran('lucia40')}
                    className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      catamaran === 'lucia40'
                        ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                        catamaran === 'lucia40' ? 'border-blue-600' : 'border-gray-300'
                      }`}>
                        {catamaran === 'lucia40' && (
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">Lucia 40</h3>
                        <p className="text-sm text-gray-600 mt-1">40 футов • До 10 гостей</p>
                        <p className="text-xs text-gray-500 mt-2">4 каюты • 2 санузла</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Выбор дат */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                    Дата начала
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                    Дата окончания
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  />
                </div>
              </div>

              {/* Количество человек */}
              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                  Количество гостей
                </label>
                <div className="flex items-center gap-4">
                  {/* Кнопка минус */}
                  <button
                    type="button"
                    onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg transition-all duration-200 text-xl"
                  >
                    −
                  </button>

                  {/* Поле ввода */}
                  <div className="flex-1">
                    <input
                      type="number"
                      min="1"
                      max={getMaxGuests()}
                      value={numberOfPeople}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setNumberOfPeople(Math.min(getMaxGuests(), Math.max(1, value)));
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base text-center font-semibold text-lg"
                    />
                  </div>

                  {/* Кнопка плюс */}
                  <button
                    type="button"
                    onClick={() => setNumberOfPeople(Math.min(getMaxGuests(), numberOfPeople + 1))}
                    className="w-12 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-200 text-xl"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {startDate && endDate && (() => {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    const diffTime = end.getTime() - start.getTime();
                    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                    return days === 1
                      ? "Максимум 15 гостей для однодневного тура"
                      : "Максимум 12 гостей для туров с ночевкой";
                  })() || "Выберите даты для определения максимального количества гостей"}
                </p>
              </div>

              {/* Питание */}
              <div className="border-2 border-gray-200 rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-700">Нужно питание?</h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">500 ฿ на человека в день</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needFood}
                      onChange={(e) => setNeedFood(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <button
                  onClick={() => navigate('/food-menu')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200"
                >
                  📋 Посмотреть меню на 1 день
                </button>
              </div>

              {/* Повар и продукты (только для 2, 3, 7 дней) */}
              {startDate && endDate && (() => {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const diffTime = end.getTime() - start.getTime();
                const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

                if (days === 2 || days === 3 || days === 7) {
                  return (
                    <div className="border-2 border-purple-200 rounded-xl p-4 sm:p-6 bg-purple-50">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-4">
                        Дополнительные услуги для {days}-дневного тура
                      </h3>

                      {/* Повар */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-purple-200">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-700">Персональный повар</h4>
                          <p className="text-xs text-gray-500 mt-1">4,000 ฿ за день × {days} {days === 1 ? 'день' : days <= 4 ? 'дня' : 'дней'} = {4000 * days} ฿</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={needChef}
                            onChange={(e) => setNeedChef(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>

                      {/* Продукты по чеку */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Продукты по чеку (по вашему запросу)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={groceriesAmount}
                          onChange={(e) => setGroceriesAmount(e.target.value)}
                          placeholder="Введите сумму в батах"
                          className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
                        />
                        <p className="text-xs text-gray-500 mt-2">Мы купим продукты по вашему списку, вы оплатите по чеку</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Кнопка расчета */}
              <button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Рассчитать стоимость
              </button>

              {/* Сообщение об ошибке */}
              {errorMessage && (
                <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                  <p className="text-sm sm:text-base text-red-600 text-center">{errorMessage}</p>
                </div>
              )}

              {/* Результат */}
              {calculatedPrice !== null && (() => {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const diffTime = end.getTime() - start.getTime();
                const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                const numberOfNights = numberOfDays - 1;

                // Рассчитываем компоненты цены для детализации
                const basePrice = calculateTotalPrice(startDate, endDate) || 0;
                const foodCost = needFood ? 500 * numberOfPeople * numberOfDays : 0;
                const chefCost = needChef ? 4000 * numberOfDays : 0;
                const groceriesCost = groceriesAmount ? parseFloat(groceriesAmount) : 0;

                return (
                  <div className="mt-6 space-y-4">
                    {/* Детализация стоимости */}
                    <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Детализация стоимости</h3>

                      <div className="space-y-3">
                        {/* Базовая стоимость */}
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                          <div>
                            <p className="text-sm font-semibold text-gray-700">Аренда катамарана</p>
                            <p className="text-xs text-gray-500">{catamaran === 'astrea42' ? 'Astrea 42' : 'Lucia 40'} • {numberOfDays} {numberOfDays === 1 ? 'день' : numberOfDays <= 4 ? 'дня' : 'дней'}</p>
                          </div>
                          <p className="text-base font-bold text-gray-900">{basePrice.toLocaleString()} ฿</p>
                        </div>

                        {/* Питание */}
                        {needFood && (
                          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                            <div>
                              <p className="text-sm font-semibold text-gray-700">Питание</p>
                              <p className="text-xs text-gray-500">{numberOfPeople} {numberOfPeople === 1 ? 'человек' : numberOfPeople <= 4 ? 'человека' : 'человек'} × {numberOfDays} {numberOfDays === 1 ? 'день' : numberOfDays <= 4 ? 'дня' : 'дней'} × 500 ฿</p>
                            </div>
                            <p className="text-base font-bold text-green-600">+{foodCost.toLocaleString()} ฿</p>
                          </div>
                        )}

                        {/* Повар */}
                        {needChef && (numberOfDays === 2 || numberOfDays === 3 || numberOfDays === 7) && (
                          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                            <div>
                              <p className="text-sm font-semibold text-gray-700">Персональный повар</p>
                              <p className="text-xs text-gray-500">4,000 ฿ × {numberOfDays} {numberOfDays === 1 ? 'день' : numberOfDays <= 4 ? 'дня' : 'дней'}</p>
                            </div>
                            <p className="text-base font-bold text-purple-600">+{chefCost.toLocaleString()} ฿</p>
                          </div>
                        )}

                        {/* Продукты по чеку */}
                        {groceriesCost > 0 && (
                          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                            <div>
                              <p className="text-sm font-semibold text-gray-700">Продукты по чеку</p>
                              <p className="text-xs text-gray-500">По вашему запросу</p>
                            </div>
                            <p className="text-base font-bold text-orange-600">+{groceriesCost.toLocaleString()} ฿</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Итоговая сумма */}
                    <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
                      <div className="text-center">
                        <p className="text-sm sm:text-base text-gray-600 mb-1">Итоговая стоимость</p>
                        <p className="text-4xl sm:text-5xl font-bold text-green-600">
                          {calculatedPrice.toLocaleString()} ฿
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2">
                          {numberOfDays} {numberOfDays === 1 ? 'день' : numberOfDays <= 4 ? 'дня' : 'дней'} / {numberOfNights} {numberOfNights === 1 ? 'ночь' : numberOfNights <= 4 ? 'ночи' : 'ночей'} • {numberOfPeople} {numberOfPeople === 1 ? 'гость' : numberOfPeople <= 4 ? 'гостя' : 'гостей'}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          с {new Date(startDate).toLocaleDateString('ru-RU')} по {new Date(endDate).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

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
                      Выбранная дата находится в нерабочем периоде (июнь - сентябрь). Пожалуйста, выберите дату с октября по май.
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
                      Цена за день
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
                        {period.pricePerDay}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-700 text-center">
                  <span className="font-semibold text-green-700">Стоимость ночей:</span> каждая ночь добавляет <span className="font-bold">5,000 ฿</span> к общей стоимости
                </p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-700 text-center mb-2">
                  <span className="font-semibold text-blue-700">Доступные варианты туров:</span>
                </p>
                <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                  <li>• 1 день / 0 ночей</li>
                  <li>• 2 дня / 1 ночь (+5,000 ฿)</li>
                  <li>• 3 дня / 2 ночи (+10,000 ฿)</li>
                  <li>• 7 дней / 6 ночей (+30,000 ฿)</li>
                </ul>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-700 text-center">
                  <span className="font-semibold text-purple-700">Формула расчета:</span> (сумма цен за все дни) + (количество ночей × 5,000 ฿)
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                <span className="font-semibold text-yellow-700">Обратите внимание:</span> С июня по сентябрь - нерабочий сезон
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
