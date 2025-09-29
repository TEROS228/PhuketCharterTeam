// components/pages/CatamaranPage.tsx
import { useParams } from 'react-router-dom';
import { catamarans } from '../../data/catamarans';
import BookingModal from '../BookingModal';
import { useState } from 'react';

const CatamaranPage = () => {
  const { id } = useParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const catamaran = catamarans.find(c => c.id === Number(id));

  if (!catamaran) {
    return <div>Катамаран не найден</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{catamaran.name}</h1>
      {/* Детальная информация о катамаране */}
      <button 
        onClick={() => setIsBookingModalOpen(true)}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
      >
        Забронировать
      </button>

      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        catamaran={catamaran}
      />
    </div>
  );
};