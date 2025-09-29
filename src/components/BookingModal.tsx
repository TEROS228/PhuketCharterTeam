// components/BookingModal.tsx
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  catamaran?: Catamaran; // Опционально, если вызывается не со страницы катамарана
}

const BookingModal = ({ isOpen, onClose, catamaran }: BookingModalProps) => {
  const [selectedCatamaran, setSelectedCatamaran] = useState(catamaran);
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'email'>('whatsapp');

  const handleWhatsAppBooking = () => {
    const message = `Здравствуйте! Хочу забронировать катамаран: ${selectedCatamaran?.name}`;
    const phone = '79991234567';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Бронирование</h2>
        
        {/* Логика выбора катамарана, дат, контактных данных */}
        
        <div className="flex gap-4 mt-6">
          <button 
            onClick={handleWhatsAppBooking}
            className="flex-1 bg-green-500 text-white p-2 rounded"
          >
            WhatsApp
          </button>
          <button 
            onClick={() => setContactMethod('email')}
            className="flex-1 bg-blue-500 text-white p-2 rounded"
          >
            Email
          </button>
        </div>
        
        <button 
          onClick={onClose}
          className="mt-4 bg-gray-300 px-4 py-2 rounded w-full"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};