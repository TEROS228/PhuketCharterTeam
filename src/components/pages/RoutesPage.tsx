import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Route {
  id: number;
  name: string;
  description: string;
  duration: string;
  highlights: string[];
  price: string;
  image: string;
}

const RoutesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const routes: Route[] = [
    {
      id: 1,
      name: '1 День. Пхукет - Острова Кхай -Райнг Яй - Нака',
      description: 'Знаменитые острова с кристально чистой водой и белоснежными пляжами',
      duration: 'с 9:00 до 17:00',
      highlights: ['Острова Кхай - "острова миллиона рыбок"', 'Жемчужная ферма на Ранг Яй', 'Кормление рыбок у берега', 'Снорклинг в лазурных водах'],
      price: 'От 40,000',
      image: '/images/routes/phi-phi.jpg'
    },
    {
      id: 2,
      name: '1 День. Пхукет - Пханг Нга (остров Хонг - остров Дж. Бонда)',
      description: 'Уникальные известняковые скалы и мангровые леса',
      duration: 'с 9:00 до 17:00',
      highlights: ['Остров Джеймса Бонда', 'Знаменитая скала Ко Тапу', 'Плавучая деревня Ко-Панъи', 'Каякинг в морских пещерах'],
      price: 'От 40,000',
      image: '/images/routes/phang-nga.jpg'
    },
    {
      id: 3,
      name: '1 День. Пхукет - Остров Хонг (Краби)',
      description: 'Остров с пустотой внутри и скрытой лагуной',
      duration: 'с 9:00 до 17:00',
      highlights: ['Пляж Пелай - один из красивейших в Краби', 'Скрытая лагуна с кристальной водой', 'Каякинг к секретным местам', 'Снорклинг среди коралловых рифов'],
      price: 'От 40,000',
      image: '/images/routes/similan.jpg'
    },
    {
      id: 4,
      name: '2 Дня. Пхукет - остров Рача Яй',
      description: 'Белоснежные пляжи и коралловые рифы как в фильме "Баунти"',
      duration: '2 дня / 1 ночь',
      highlights: ['Белоснежные пляжи', 'Коралловые рифы для снорклинга', 'Прозрачная морская вода', 'Тропическая растительность'],
      price: 'От 85,000',
      image: '/images/routes/coral.jpg'
    },
    {
      id: 5,
      name: '2 Дня. Пхукет - Краби (Чикен Айленд+ Ао Нанг + Ралей бич)',
      description: 'Куриный остров с уникальной скалой и красивые пляжи Краби',
      duration: '2 дня / 1 ночь',
      highlights: ['Chicken Island со скалой-головой курицы', 'Пляж Ао Нанг', 'Уединенный Ралей бич', 'Живописные известняковые скалы'],
      price: 'От 85,000',
      image: '/images/routes/racha.jpg'
    },
    {
      id: 6,
      name: '2 Дня. Пхукет - остров Пи Пи (бухта Майя бэй фильм "Пляж "+ Пхи Пхи дон)',
      description: 'Знаменитые острова из фильма "Пляж" с Ди Каприо',
      duration: '2 дня / 1 ночь',
      highlights: ['Бухта Майя Бэй из фильма "Пляж"', 'Белоснежные пляжи Пхи Пхи Дон', 'Потрясающие джунгли', 'Зажигательные вечеринки'],
      price: 'От 85,000',
      image: '/images/routes/krabi.jpg'
    },
    {
      id: 7,
      name: '3 Дня. Остров Ко Рок',
      description: 'Нетронутые острова в провинции Транг для уединенного отдыха',
      duration: '3 дня / 2 ночи',
      highlights: ['Острова Рок и Ха', 'Нереально голубая прозрачная вода', 'Нетронутый подводный мир', 'Снорклинг без толп туристов'],
      price: 'От 130,000',
      image: '/images/routes/sunset.jpg'
    },
    {
      id: 8,
      name: '3 Дня. Симиланские острова',
      description: 'Национальный парк и одно из 10 лучших мест для дайвинга на Земле',
      duration: '3 дня / 2 ночи',
      highlights: ['Национальный парк Таиланда', 'Топ-10 мест для дайвинга в мире', 'Плавание с черепахами', 'Встреча с китовой акулой'],
      price: 'От 130,000',
      image: '/images/routes/ko-lan.jpg'
    },
    {
      id: 9,
      name: '3 Дня. Остров Ланта',
      description: 'Четвертый по величине остров Таиланда для спокойного отдыха',
      duration: '3 дня / 2 ночи',
      highlights: ['Архипелаг из 52 островов', 'Живописные закаты на западном побережье', 'Атмосфера умиротворения', 'Густые тропические леса'],
      price: 'От 130,000',
      image: '/images/routes/ko-he.jpg'
    },
    {
      id: 10,
      name: '7 Дней. Большое путешествие по Андаманскому морю',
      description: 'Исследование нескольких островов за 3 дня',
      duration: '7 дней / 6 ночей',
      highlights: ['Несколько островов', 'Ночевка на катамаране', 'Рыбалка', 'Дайвинг'],
      price: '310,000',
      image: '/images/routes/multi-day.jpg'
    }
  ];

const categories = [
  { id: 'all', name: 'Все маршруты' },
  { id: '1-day', name: '1 день' },
  { id: '2-day', name: '2 дня' },
  { id: '3-day', name: '3 дня' },
  { id: '7-day', name: '7 дней' }
];

const filteredRoutes = routes.filter(route => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === '1-day') return route.name.startsWith('1 День');
    if (selectedCategory === '2-day') return route.name.startsWith('2 Дня');
    if (selectedCategory === '3-day') return route.name.startsWith('3 Дня');
    if (selectedCategory === '7-day') return route.name.startsWith('7 Дней');
    return true;
  });

  const handleViewDetails = (routeId: number) => {
    navigate(`/route/${routeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* КНОПКА НАЗАД - с отступом для хедера */}
      <div className="pt-24 pb-6">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">На главную</span>
          </button>
        </div>
      </div>

      {/* Hero секция */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Морские маршруты
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Откройте для себя самые красивые острова и скрытые жемчужины Андаманского моря
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Фильтры */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Сетка маршрутов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredRoutes.map(route => (
            <div key={route.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
              <div className="relative h-64">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-200"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {route.price} ฿
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{route.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{route.description}</p>
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{route.duration}</span>
                  </div>
                </div>
                <div className="mb-6 flex-grow">
                  <h4 className="font-semibold text-gray-900 mb-3">Основные достопримечательности:</h4>
                  <div className="flex flex-wrap gap-2">
                    {route.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails(route.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 mt-auto"
                >
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;