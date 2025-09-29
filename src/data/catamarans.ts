export interface Catamaran {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  price: string;
  capacity: number;
  length: string;
  features: string[];
  images: string[];
}

export const catamarans: Catamaran[] = [
  {
    id: 1,
    name: "Катамаран «Морской Ветер»",
    description: "Комфортабельный катамаран для больших компаний",
    fullDescription: "Подробное описание...",
    price: "15 000 ₽/день",
    capacity: 12,
    length: "12 метров",
    features: ["Кондиционер", "Кухня", "Душ", "TV"],
    images: ["/images/catamaran1-1.jpg", "/images/catamaran1-2.jpg"]
  },
  {
    id: 2,
    name: "Катамаран «Солнечный Парус»",
    description: "Идеальный выбор для романтического путешествия",
    fullDescription: "Подробное описание...",
    price: "12 000 ₽/день",
    capacity: 8,
    length: "10 метров",
    features: ["Панорамные окна", "Бар", "Спальная каюта"],
    images: ["/images/catamaran2-1.jpg", "/images/catamaran2-2.jpg"]
  }
];