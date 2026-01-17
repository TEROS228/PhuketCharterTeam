import React, { useState } from 'react';
import Price from '../Price';

const Lamer56Page = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });

  const images = Array.from({ length: 26 }, (_, i) => `/images/Lamer56/${i + 1}.jpeg`);

  const imageLabels = Array.from({ length: 26 }, (_, i) => `Фото ${i + 1}`);

  const specifications = [
    { label: 'Длина', value: '56 футов (17м)' },
    { label: 'Ширина', value: '9 м' },
    { label: 'Пассажиры', value: 'До 20 человек' },
    { label: 'Каюты', value: '5 кают + 5 санузлов' },
    { label: 'Год', value: '2024' }
  ];

  const features = [
    'Свежие фрукты', 'Безалкогольные напитки', 'Маски и ласты', 'Кондиционер',
    'Снаряжение для снорклинга', 'Оборудование для рыбалки', 'Аудиосистема',
    'Спасательные жилеты', 'Аптечка', 'Полотенца'
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Защита от множественной отправки
    const lastSubmit = sessionStorage.getItem('lastFormSubmit');
    const now = Date.now();
    if (lastSubmit && now - parseInt(lastSubmit) < 1000) {
      return;
    }
    sessionStorage.setItem('lastFormSubmit', now.toString());

    // Отправляем событие конверсии в GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'form_submit',
        form_type: 'catamaran_booking',
        form_name: 'Бронирование Lamer 56'
      });
    }

    // Устанавливаем флаг успешной отправки формы
    sessionStorage.setItem('formSubmitted', 'true');

    const form = document.createElement('form');
    form.action = 'https://formsubmit.co/leontrofim228@gmail.com';
    form.method = 'POST';
    form.style.display = 'none';

    const fields = [
      { name: '_subject', value: `Новый запрос на бронирование Lamer 56 от ${formData.firstName} ${formData.lastName}` },
      { name: '_next', value: window.location.origin + window.location.pathname + '#/success' },
      { name: '_captcha', value: 'false' },
      { name: 'catamaran', value: 'Lamer 56' },
      { name: 'first_name', value: formData.firstName },
      { name: 'last_name', value: formData.lastName },
      { name: 'email', value: formData.email },
      { name: 'phone', value: formData.phone },
      { name: 'additional_info', value: formData.additionalInfo },
      { name: 'page_url', value: window.location.href }
    ];

    fields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = field.name;
      input.value = field.value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation breadcrumb */}
      <div className="bg-white border-b shadow-sm mt-32 sm:mt-28">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs sm:text-sm text-gray-600 overflow-x-auto">
              <a href="/" className="hover:text-blue-600 transition-colors whitespace-nowrap">Главная</a>
              <span className="mx-1 sm:mx-2 text-gray-400">/</span>
              <a href="/fleet" className="hover:text-blue-600 transition-colors whitespace-nowrap">Флот</a>
              <span className="mx-1 sm:mx-2 text-gray-400">/</span>
              <span className="text-gray-900 font-medium whitespace-nowrap">Lamer 56</span>
            </div>

            <button
              onClick={handleBackClick}
              className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-blue-200 ml-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium text-sm">Назад</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Мобильная кнопка назад */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => window.history.back()}
            className="group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 z-10 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold z-10">Назад к флоту</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 sm:mb-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-8">
            {/* Main Image */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-12 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={images[selectedImageIndex]}
                  alt={imageLabels[selectedImageIndex]}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Image Thumbnails */}
              <div className="mt-4 grid grid-cols-6 gap-2">
                {images.slice(0, 12).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-blue-500 shadow-md'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="mb-4 sm:mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium mb-2">
                  Akula Catamarans
                </span>
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Lamer 56</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Роскошный катамаран премиум-класса для незабываемых путешествий
                </p>
              </div>

              {/* Specifications */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Характеристики</h3>
                <div className="space-y-2 sm:space-y-3">
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-semibold text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 sm:p-6 text-white mb-4 sm:mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <Price amount={50000} className="text-2xl sm:text-3xl font-bold" />
                  <span className="text-xs sm:text-sm opacity-90">/ день</span>
                </div>
                <p className="text-xs sm:text-sm opacity-90">Аренда катамарана на день</p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setShowContactForm(!showContactForm)}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                {showContactForm ? 'Скрыть форму' : 'Забронировать сейчас'}
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Форма бронирования</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Имя"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
                <input
                  type="text"
                  placeholder="Фамилия"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
              <input
                type="tel"
                placeholder="Телефон"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
              <textarea
                placeholder="Дополнительная информация"
                rows={4}
                value={formData.additionalInfo}
                onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Отправить запрос
              </button>
            </form>
          </div>
        )}

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Что включено</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Галерея</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <img src={img} alt={imageLabels[idx]} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lamer56Page;
