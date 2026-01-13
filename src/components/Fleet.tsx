import React from 'react';
import CatamaranCard from './CatamaranCard';

const Fleet = () => {
  const catamarans = [
    {
      id: 1,
      name: 'Astrea 42',
      description: 'Роскошный катамаран для комфортного путешествия',
      price: 'От 40,000',
      capacity: 10,
      length: '42 фута',
      image: '/images/catamaran1.jpg',
      features: ['4 каюты', 'Просторная кухня', 'Просторный салон', 'Пространство на крыше рубки']
    },
    {
      id: 2,
      name: 'Lucia 40',
      description: 'Идеален для романтических путешествий',
      price: 'От 40,000',
      capacity: 12,
      length: '40 футов',
      image: '/images/catamaran2.jpg',
      features: ['4 каюты', 'Панорамные окна', 'Солнечная палуба']
    }
  ];

  return (
    <section id="fleet" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Катамараны для аренды на Пхукете
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Luxury катамараны Astrea 42 и Lucia 40 для аренды в Таиланде. Комфорт и безопасность для вашего путешествия
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          {catamarans.map(catamaran => (
            <CatamaranCard key={catamaran.id} catamaran={catamaran} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;