import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Кнопка назад */}
      <div className="pt-20 sm:pt-24 pb-4 sm:pb-6">
        <div className="container mx-auto px-3 sm:px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 shadow-sm text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">На главную</span>
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            Политика конфиденциальности
          </h1>
          <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto">
            Защита ваших персональных данных
          </p>
        </div>
      </div>

      {/* Контент */}
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-12">
          <div className="prose prose-blue max-w-none">
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Настоящая Политика конфиденциальности описывает, как Phuket Charter Team (далее — «мы», «наш» или «Сайт») собирает, использует и защищает вашу информацию при использовании нашего сайта <a href="https://phuketcharterteam.com/" className="text-blue-600 hover:underline">https://phuketcharterteam.com/</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">1. Какие данные мы собираем</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Мы можем собирать следующие типы информации:
              </p>
              <ul className="list-disc text-gray-700 space-y-2 ml-6">
                <li><strong>Персональные данные:</strong> Имя, номер телефона, адрес электронной почты, которые вы добровольно предоставляете нам через формы обратной связи, калькулятор или мессенджеры (WhatsApp/Telegram).</li>
                <li><strong>Технические данные:</strong> IP-адрес, тип браузера, время посещения и страницы, которые вы просматриваете. Эти данные собираются автоматически с помощью файлов cookie и систем аналитики (Google Analytics).</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">2. Цели сбора данных</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Мы используем собранную информацию для:
              </p>
              <ul className="list-disc text-gray-700 space-y-2 ml-6">
                <li>Обработки ваших запросов на аренду катамаранов.</li>
                <li>Предоставления консультаций по маршрутам и стоимости.</li>
                <li>Улучшения работы нашего сайта и качества обслуживания.</li>
                <li>Настройки релевантной рекламы (через инструменты Google Ads).</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">3. Использование файлов Cookie</h2>
              <p className="text-gray-700 leading-relaxed">
                Мы используем файлы cookie для анализа трафика и запоминания ваших предпочтений. Вы можете отключить cookie в настройках своего браузера, однако это может повлиять на функциональность некоторых частей сайта.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">4. Передача данных третьим лицам</h2>
              <p className="text-gray-700 leading-relaxed">
                Мы не продаем и не передаем ваши личные данные третьим лицам, за исключением случаев, когда это необходимо для выполнения вашего заказа (например, предоставление данных экипажу) или требуется законом. Мы используем защищенные сервисы аналитики от Google, которые обрабатывают данные в соответствии со своими стандартами безопасности.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">5. Защита информации</h2>
              <p className="text-gray-700 leading-relaxed">
                Мы принимаем необходимые технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения или удаления.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">6. Ссылки на сторонние ресурсы</h2>
              <p className="text-gray-700 leading-relaxed">
                Наш сайт может содержать ссылки на сторонние ресурсы (например, мессенджер WhatsApp). Мы не несем ответственности за политику конфиденциальности этих сайтов.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">7. Контакты</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Если у вас есть вопросы по поводу данной политики, свяжитесь с нами:
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> <a href="mailto:first5500@gmail.com" className="text-blue-600 hover:underline">first5500@gmail.com</a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Телефон:</strong> <a href="tel:+66854741566" className="text-blue-600 hover:underline">+66 85 474 1566</a>
                </p>
                <p className="text-gray-700">
                  <strong>Адрес:</strong> Пхукет, Таиланд
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-gray-500 text-sm">
                <strong>Дата последнего обновления:</strong> 20 декабря 2024 года
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
