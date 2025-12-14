import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [isValidAccess, setIsValidAccess] = useState(false);

  useEffect(() => {
    // Проверяем, была ли отправлена форма
    const formSubmitted = sessionStorage.getItem('formSubmitted');

    if (formSubmitted === 'true') {
      setIsValidAccess(true);
      // Очищаем флаг после проверки
      sessionStorage.removeItem('formSubmitted');
      // Прокрутка наверх при загрузке
      window.scrollTo(0, 0);
    } else {
      // Если форма не была отправлена, редиректим на главную
      navigate('/');
    }
  }, [navigate]);

  // Показываем контент только если доступ валиден
  if (!isValidAccess) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-cyan-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Анимированная галочка */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-2xl animate-bounce-slow mb-6">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Спасибо за заявку!
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-2">
            Ваш запрос успешно отправлен
          </p>

          <p className="text-sm sm:text-base text-gray-500">
            Мы свяжемся с вами в ближайшее время
          </p>
        </div>

        {/* Информационная карточка */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Что дальше?</h3>
                <p className="text-sm text-gray-600">Наш менеджер обработает вашу заявку в течение 1-2 часов в рабочее время</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Проверьте почту</h3>
                <p className="text-sm text-gray-600">Подтверждение отправлено на указанный вами email</p>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопки навигации */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Вернуться на главную
          </button>

          <button
            onClick={() => navigate('/routes')}
            className="flex-1 px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
          >
            Посмотреть маршруты
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
