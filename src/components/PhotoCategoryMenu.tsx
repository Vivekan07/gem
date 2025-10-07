import React from 'react';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  isActive?: boolean;
}

interface PhotoCategoryMenuProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const PhotoCategoryMenu: React.FC<PhotoCategoryMenuProps> = ({ 
  selectedCategory, 
  onCategorySelect 
}) => {
  const categories: CategoryItem[] = [
   
    {
      id: 'bridal collection',
      name: 'Bridal collection',
      image: '/WhatsApp Image 2025-09-29 at 16.43.13_9738fb2e copy copy.jpg'
    },
    {
      id: 'necklace',
      name: 'Necklace',
      image: '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg'
    },
    {
      id: 'aharam',
      name: 'Aharam',
      image: '/WhatsApp Image 2025-09-29 at 16.29.13_d36c45a7.jpg'
    },
    {
      id: 'earings',
      name: 'Earings',
      image: '/WhatsApp Image 2025-09-29 at 16.19.10_2ea69db4.jpg'
    },
    {
      id: 'bangles',
      name: 'Bangles',
      image: '/WhatsApp Image 2025-09-29 at 17.01.23_d3b46a6b copy.jpg'
    },
     {
      id: 'all',
      name: 'Other Accessories',
      image: '/WhatsApp Image 2025-09-29 at 16.43.38_68e91623 copy copy copy copy copy.jpg'
    }
  ];

  return (
    <div className="mb-12 animate-slide-up">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-110 ${
              selectedCategory === category.id
                ? 'ring-4 ring-luxury-gold shadow-2xl shadow-luxury-gold/30 scale-105 animate-glow'
                : 'hover:shadow-xl hover:shadow-luxury-gold/20 border border-luxury-gold/20 hover:border-luxury-gold/40'
            }`}
          >
            {/* Background Image */}
            <div className="relative w-36 h-24 sm:w-44 sm:h-28 md:w-52 md:h-32">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg';
                }}
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 transition-all duration-500 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-t from-luxury-gold/90 via-luxury-gold/50 to-transparent'
                  : 'bg-gradient-to-t from-luxury-black/70 via-luxury-charcoal/30 to-transparent group-hover:from-luxury-gold/70 group-hover:via-luxury-gold/40'
              }`} />
              
              {/* Category Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`font-bold text-center px-3 transition-all duration-500 ${
                  selectedCategory === category.id
                    ? 'text-luxury-black text-base sm:text-lg drop-shadow-lg'
                    : 'text-luxury-white text-base sm:text-lg group-hover:text-luxury-softWhite drop-shadow-lg'
                }`}>
                  {category.name}
                </span>
              </div>
              
              {/* Active Indicator */}
              {selectedCategory === category.id && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-4 bg-luxury-gold rounded-full border-2 border-luxury-softWhite shadow-xl animate-bounce-gentle" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhotoCategoryMenu;