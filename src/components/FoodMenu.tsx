import React, { useState } from 'react';
import { trackWhatsAppClick, trackEmailSubmit } from '../utils/analytics';

const FoodMenu = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: '',
    additionalInfo: ''
  });

  const menus = [
    {
      id: 'menu1',
      title: 'Меню 1',
      price: '500',
      items: [
        'Брускетта с сыром и рыбой',
        'Овощной салат',
        'Сибас запеченный в духовке',
        'Жареный рис с овощами'
      ]
    },
    {
      id: 'menu2',
      title: 'Меню 2',
      price: '500',
      items: [
        'Брускетта с сыром и рыбой',
        'Овощной салат с креветкой',
        'Куриные крылышки запеченные в духовке',
        'Картофель по домашнему'
      ]
    },
    {
      id: 'menu3',
      title: 'Меню 3',
      price: '500',
      items: [
        'Брускетта с сыром и рыбой',
        'Салат из папайи',
        'Том ям',
        'Жареный рис с курицей'
      ]
    }
  ];

  const handleOrderClick = (menuTitle: string) => {
    setSelectedMenu(menuTitle);
    setShowContactForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Создаем форму для отправки через FormSubmit
    const form = document.createElement('form');
    form.action = 'https://formsubmit.co/leontrofim228@gmail.com';
    form.method = 'POST';
    form.style.display = 'none';

    // Скрытые поля
    const fields = [
      { name: '_subject', value: `Заказ питания ${selectedMenu} от ${formData.firstName} ${formData.lastName}` },
      { name: '_next', value: window.location.href + '?sent=true' },
      { name: '_captcha', value: 'false' },
      { name: 'menu', value: selectedMenu },
      { name: 'first_name', value: formData.firstName },
      { name: 'last_name', value: formData.lastName },
      { name: 'email', value: formData.email },
      { name: 'phone', value: formData.phone },
      { name: 'guests', value: formData.guests },
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

  return (
    <>
      <section id="food" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Меню питания
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Вкуснейшие блюда от нашего шеф-повара. Свежие морепродукты и тропические фрукты
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {menus.map((menu, index) => (
              <div key={menu.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {menu.title}
                  </h3>
                  <div className="text-3xl font-bold text-blue-600">
                    {menu.price} ฿
                  </div>
                  <p className="text-sm text-gray-500">с человека</p>
                </div>

                <div className="space-y-4 mb-6">
                  {menu.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 mb-8">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Вода и прохладительные напитки</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                      <span>Фруктовая тарелка</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Условия заказа</h3>
              <p className="text-gray-600 mb-4">
                Все меню доступны по цене <strong>500 ฿ с человека</strong>
              </p>
              <p className="text-sm text-gray-500">
                * Минимальный заказ от 6 человек
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно заказа */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Заголовок */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Заказ питания</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Выбор способа связи */}
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Выберите удобный способ связи:</p>
                  
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/79147953955"
                      onClick={trackWhatsAppClick}
                      className="flex items-center justify-center gap-3 w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                      </svg>
                      Связаться через WhatsApp
                    </a>

                    <div className="text-center text-gray-500 text-sm">или</div>

                    <button
                      onClick={() => {
                        document.getElementById('food-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition"
                    >
                      Отправить запрос по почте
                    </button>
                  </div>
                </div>
              </div>

              {/* Форма */}
              <div id="food-form">
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
                      Количество гостей *
                    </label>
                    <input
                      type="number"
                      required
                      min="6"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Минимум 6 человек"
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
                      placeholder="Особые пожелания, аллергии, диетические ограничения..."
                    />
                  </div>

                  {/* Информация о выбранном меню */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">{selectedMenu}</h4>
                    <p className="text-sm text-blue-700">
                      500 ฿ с человека • Минимум 6 человек
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
                      Отправить заказ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodMenu;