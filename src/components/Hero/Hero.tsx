import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        <picture>
          <source srcSet="/images/heromobile.jpg" media="(max-width: 640px)" />
          <source srcSet="/images/hero/catamaran-hero-bg.webp" type="image/webp" />
          <img
            src="/images/hero/catamaran-hero-bg.jpg"
            alt="Catamaran on Phuket"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
          />
        </picture>
        
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-cyan-800/30 to-teal-700/40"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-16 sm:h-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white/10 animate-wave"
            ></path>
          </svg>
        </div>
      </div>

      {/* Контент */}
      <div className="relative z-20 h-full flex items-center justify-center text-center text-white px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="inline-block">
                Аренда катамарана
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Пхукет
              </span>
            </h1>

            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto">
              Катамаран аренда от 40,000 THB. Luxury катамараны для незабываемых путешествий по Андаманскому морю
            </p>
          </div>

          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-12">
            <button
              onClick={() => {
                const element = document.getElementById('fleet');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm sm:text-lg rounded-full shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Выбрать катамаран
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => navigate('/routes')}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/80 text-white hover:text-cyan-900 font-semibold text-sm sm:text-lg rounded-full backdrop-blur-sm bg-white/10 hover:bg-white transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Смотреть маршруты
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator - скрыт на очень маленьких экранах */}
      <div className="hidden sm:flex absolute bottom-8 left-0 right-0 z-20 justify-center">
        <div className="animate-bounce">
          <div className="group cursor-pointer flex flex-col items-center" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center backdrop-blur-sm bg-white/10 group-hover:border-white group-hover:bg-white/20 transition-all duration-300">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 group-hover:bg-white transition-colors duration-300"></div>
            </div>
            <p className="text-xs text-white/60 mt-2 group-hover:text-white/80 transition-colors duration-300 whitespace-nowrap">Прокрутить вниз</p>
          </div>
        </div>
      </div>

      {/* Плавающие элементы - скрыты на мобильных */}
      <div className="hidden md:block absolute top-20 left-10 w-3 h-3 bg-cyan-400 rounded-full opacity-70 animate-ping delay-1000"></div>
      <div className="hidden md:block absolute top-40 right-20 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping delay-2000"></div>
      <div className="hidden md:block absolute bottom-40 left-20 w-2 h-2 bg-teal-400 rounded-full opacity-50 animate-ping delay-3000"></div>
    </section>
  );
};

export default Hero;