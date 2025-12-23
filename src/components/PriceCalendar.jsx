import React from 'react';
import Price from './Price';

const PriceCalendar = () => {
const months = [
 { month: 'Январь', price: 50000, available: true },
 { month: 'Февраль', price: 45000, available: true },
 { month: 'Март', price: 45000, available: true },
 { month: 'Апрель', price: 40000, available: true },
 { month: 'Май', price: 40000, available: true },
 { month: 'Июнь', price: null, available: false },
 { month: 'Июль', price: null, available: false },
 { month: 'Август', price: null, available: false },
 { month: 'Сентябрь', price: null, available: false },
 { month: 'Октябрь', price: 40000, available: true },
 { month: 'Ноябрь', price: 40000, available: true },
 { month: 'Декабрь', price: 45000, available: true }
 ];

  return (
    <section id="prices" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Календарь цен
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Сезонные цены на аренду катамаранов. Выбирайте оптимальное время для путешествия
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {months.map((item, index) => (
            <div 
              key={index} 
              className={`group relative rounded-2xl shadow-lg border p-6 text-center transition-all duration-300 ${
                item.available 
                  ? 'bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-2xl hover:-translate-y-2 hover:scale-105' 
                  : 'bg-gray-100/80 backdrop-blur-sm border-gray-200/50 opacity-75'
              }`}
            >
              {/* Градиентная подложка для доступных месяцев */}
              {item.available && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.month}</h3>
                
                {item.available ? (
                  <>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                      <Price amount={item.price} />
                    </div>
                    <p className="text-sm text-gray-500">с 9:00 до 17:00</p>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-semibold text-gray-500 mb-2 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                      </svg>
                      Недоступно
                    </div>
                    <p className="text-xs text-gray-400 bg-gray-200 rounded-full px-3 py-1 inline-block">
                    </p>
                  </>
                )}
              </div>

              {/* Декоративный элемент */}
              {item.available ? (
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60"></div>
              ) : (
                <div className="absolute top-4 right-4 w-2 h-2 bg-gray-300 rounded-full opacity-40"></div>
              )}
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="text-center mt-16">
          <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Что включено в стоимость</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Экипаж</h4>
                <p className="text-sm text-gray-600">Опытный капитан</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Топливо</h4>
                <p className="text-sm text-gray-600">Полный бак на весь день</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Снаряжение</h4>
                <p className="text-sm text-gray-600">Маски сняряжение для снорклинга</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalendar;