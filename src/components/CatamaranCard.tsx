import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Catamaran {
  id: number;
  name: string;
  description: string;
  price: string;
  capacity: number;
  length: string;
  image: string;
  features: string[];
}

interface CatamaranCardProps {
  catamaran: Catamaran;
}

const CatamaranCard = ({ catamaran }: CatamaranCardProps) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });

  const getCatamaranLink = (id: number) => {
    switch (id) {
      case 1:
        return '/catamaran/astrea-42';
      case 2:
        return '/catamaran/lucia-40';
      default:
        return '/fleet';
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = document.createElement('form');
    form.action = 'https://formsubmit.co/first5500@gmail.com';
    form.method = 'POST';
    form.style.display = 'none';
    
    const fields = [
      { name: '_subject', value: `Новый запрос на бронирование ${catamaran.name} от ${formData.firstName} ${formData.lastName}` },
      { name: '_next', value: window.location.href + '?sent=true' },
      { name: '_captcha', value: 'false' },
      { name: 'catamaran', value: catamaran.name },
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

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
        <div className="relative h-64 sm:h-72 md:h-80">
          <img
            src={catamaran.image}
            alt={catamaran.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          
          <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
            <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {catamaran.capacity} человек
            </span>
          </div>
          
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{catamaran.name}</h3>
            <div className="text-left sm:text-right">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {catamaran.price} ฿
              </span>
              <p className="text-xs sm:text-sm text-gray-500">за день</p>
            </div>
          </div>
          
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{catamaran.description}</p>
          
          <div className="mb-4 sm:mb-6 flex-grow">
            <div className="flex items-center text-gray-500 mb-3 sm:mb-4 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold mr-2">Длина:</span>
              <span>{catamaran.length}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {catamaran.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-auto">
            <Link 
              to={getCatamaranLink(catamaran.id)}
              className="group relative bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 text-center no-underline hover:text-white transform hover:-translate-y-0.5 overflow-hidden text-sm sm:text-base"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Подробнее
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <button 
              onClick={() => setShowContactForm(true)}
              className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Забронировать</span>
                <span className="sm:hidden">Бронь</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно с календарем */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6 sticky top-0 bg-white pb-4 border-b z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Бронирование</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Календарь Teamup */}
              <div className="mb-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Проверьте доступность дат</h4>
                <div className="border rounded-lg overflow-hidden bg-gray-50">
                  <iframe 
                    src="https://teamup.com/ksitee8txsgajgf5rr?view=m&showLogo=0&showSearch=0&showProfileAndInfo=0&showSidepanel=0&disableSidepanel=1&showTitle=0&showViewSelector=1&showMenu=1&showAgendaHeader=1&showAgendaDetails=0&showYearViewHeader=1"
                    className="w-full h-[350px] sm:h-[400px]"
                    frameBorder="0"
                    title="Календарь доступности"
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  <span className="inline-block w-3 h-3 bg-gray-400 rounded mr-1"></span>
                  Занятые даты отмечены в календаре
                </p>
              </div>

              <div className="space-y-4 mb-4 sm:mb-6">
                <div className="text-center">
                  <p className="text-sm sm:text-base text-gray-600 mb-4">Выберите удобный способ связи:</p>
                  
                  <div className="space-y-3">
                    <a 
                      href="https://wa.me/66854741566"
                      className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-green-600 text-white py-2.5 sm:py-3 rounded-xl font-medium hover:bg-green-700 transition text-sm sm:text-base"
                    >
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                      </svg>
                      <span>Связаться через WhatsApp</span>
                    </a>

                    <div className="text-center text-gray-500 text-xs sm:text-sm">или</div>

                    <button
                      onClick={() => {
                        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full border-2 border-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition text-sm sm:text-base"
                    >
                      Отправить запрос по почте
                    </button>
                  </div>
                </div>
              </div>

              <div id="contact-form">
                <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Имя *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="Имя"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Фамилия *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="Фамилия"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="+66 123 456 789"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Дополнительная информация
                    </label>
                    <textarea
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                      placeholder="Даты, количество гостей, пожелания..."
                    />
                  </div>

                  <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">{catamaran.name}</h4>
                    <p className="text-xs sm:text-sm text-blue-700">
                      До {catamaran.capacity} человек • От {catamaran.price} ฿/день
                    </p>
                  </div>

                  <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
                    >
                      Отправить
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

export default CatamaranCard;