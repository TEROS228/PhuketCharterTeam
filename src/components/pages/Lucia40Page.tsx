import React, { useState } from 'react';

const Lucia40Page = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });

  const images = [
    '/images/lucia40/main.jpg',
    '/images/lucia40/exterior.jpg',
    '/images/lucia40/deck.jpg',
    '/images/lucia40/interior.jpg',
    '/images/lucia40/cabin.jpg',
    '/images/lucia40/kitchen.jpg',
    '/images/lucia40/bathroom.jpg',
    '/images/lucia40/sundeck.jpg',
    '/images/lucia40/cockpit.jpg',
    '/images/lucia40/sunset.jpg'
  ];

  const imageLabels = [
    'Общий вид',
    'Внешний вид',
    'Палуба',
    'Интерьер',
    'Каюта',
    'Кухня',
    'Ванная',
    'Солярий',
    'Кокпит',
    'На закате'
  ];

  const specifications = [
    { label: 'Длина', value: '40 футов (12.2м)' },
    { label: 'Ширина', value: '6.5 м' },
    { label: 'Пассажиры', value: 'До 12 человек' },
    { label: 'Каюты', value: '4 каюты + 2 санузла' },
    { label: 'Год', value: '2019' }
  ];

  const features = [
    'Свежие фрукты', 'Безалкогольные напитки', 'Маски и ласты', 'Кондиционер',
    'Снаряжение для снорклинга', 'Оборудование для рыбалки', 'Аудиосистема',
    'Спасательные жилеты', 'Аптечка', 'Полотенца'
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Создаем форму для отправки через FormSubmit
    const form = document.createElement('form');
    form.action = 'https://formsubmit.co/leontrofim228@gmail.com';
    form.method = 'POST';
    form.style.display = 'none';
    
    // Скрытые поля
    const fields = [
      { name: '_subject', value: `Новый запрос на бронирование Lucia 40 от ${formData.firstName} ${formData.lastName}` },
      { name: '_next', value: window.location.href + '?sent=true' },
      { name: '_captcha', value: 'false' },
      { name: 'catamaran', value: 'Lucia 40' },
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
      {/* Navigation breadcrumb с кнопкой назад */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600">
              <a href="/" className="hover:text-blue-600 transition-colors">Главная</a>
              <span className="mx-2 text-gray-400">/</span>
              <a href="/fleet" className="hover:text-blue-600 transition-colors">Флот</a>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Lucia 40</span>
            </div>
            
            {/* Кнопка назад */}
            <button 
              onClick={handleBackClick}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-blue-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium text-sm">Назад</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Крутая кнопка назад */}
        <div className="mb-6">
          <button 
            onClick={() => window.history.back()}
            className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <svg className="w-5 h-5 z-10 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold z-10 group-hover:text-white transition-colors duration-300">Назад к флоту</span>
            
            {/* Декоративные элементы */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full opacity-60 group-hover:animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full opacity-40 group-hover:animate-bounce"></div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        
          
          {/* Фото секция */}
          <div className="space-y-4">
            {/* Главное изображение */}
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
              <img
                src={images[selectedImageIndex]}
                alt={`Lucia 40 - ${imageLabels[selectedImageIndex]}`}
                className={`w-full h-96 lg:h-[500px] ${
                  images[selectedImageIndex].includes('cockpit.jpg') || images[selectedImageIndex].includes('sunset.jpg')
                    ? 'object-contain bg-gray-900' 
                    : 'object-cover'
                }`}
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Миниатюры */}
            <div className="grid grid-cols-5 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={imageLabels[index]}
                    className="w-full h-16 object-cover"
                  />
                  {selectedImageIndex === index && (
                    <div className="absolute inset-0 bg-blue-500/20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Информация */}
          <div className="space-y-8">
            {/* Заголовок и цена */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Lucia 40</h1>
              <p className="text-xl text-gray-600 mb-6">
                Элегантный катамаран для незабываемых морских приключений
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">От 40,000 ฿</span>
                <span className="text-gray-500">за день</span>
              </div>
            </div>

            {/* Быстрые характеристики */}
            <div className="grid grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border">
                  <div className="text-sm text-gray-500">{spec.label}</div>
                  <div className="font-semibold text-gray-900">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Возможности */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Что включено</h3>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="https://wa.me/66854741566"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                  </svg>
                  WhatsApp
                </a>
                
                <button
                  onClick={() => setShowContactForm(true)}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Отправить запрос
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Пакеты */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Пакеты аренды</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="font-semibold">С 9:00 до 17:00</div>
                  <div className="text-sm text-gray-600">От 40,000 ฿</div>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <div className="font-semibold">2 дня / 1 ночь</div>
                  <div className="text-sm text-gray-600">85,000 ฿</div>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <div className="font-semibold">3 дня / 2 ночи</div>
                  <div className="text-sm text-gray-600">130,000 ฿</div>
                </div>
              </div>
            </div>

            {/* Удобства */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Основные удобства</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm">Уютный салон</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <span className="text-sm">Динги с подвесным мотором</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-sm">Опреснитель</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="text-sm">Солнечная палуба</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно с формой */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Заголовок */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Запрос на бронирование</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Форма */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Фамилия *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Ваша фамилия"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+66 123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дополнительная информация
                  </label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Даты путешествия, количество гостей, особые пожелания..."
                  />
                </div>

                {/* Информация о катамаране */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Lucia 40</h4>
                  <p className="text-sm text-blue-700">
                    Элегантный катамаран до 12 человек • От 35,000 ฿/день
                  </p>
                </div>

                {/* Кнопки */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                  >
                    Отправить запрос
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lucia40Page;