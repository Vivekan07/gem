import React from 'react';
import { type Product } from '../lib/supabase';
import { Star, Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onImageClick?: (imageUrl: string, productName: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onImageClick }) => {
  return (
    <div className="bg-luxury-charcoal rounded-xl shadow-xl hover:shadow-2xl hover:shadow-luxury-gold/20 transition-all duration-500 group overflow-hidden border border-luxury-gold/20 hover:border-luxury-gold/40 animate-scale-in hover:scale-105">
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onImageClick?.(product.image_url, product.name)}>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg';
          }}
        />
        {/* Click indicator overlay */}
        <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-luxury-gold/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <Eye className="w-5 h-5 text-luxury-black" />
          </div>
        </div>
        <div className="absolute top-4 left-4 animate-slide-down">
          {!product.is_for_sale ? (
            <span className="bg-luxury-gold text-luxury-black px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-glow">
              For Rent
            </span>
          ) : (
            <span className="bg-luxury-gold text-luxury-black px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-glow">
              Available
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 animate-slide-down">
          <button 
            className="bg-luxury-charcoal/80 backdrop-blur-sm p-3 rounded-full hover:bg-luxury-gold/20 transition-all duration-300 border border-luxury-gold/30 hover:border-luxury-gold hover:scale-110 group/heart"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-5 h-5 text-luxury-gold group-hover/heart:text-luxury-amber group-hover/heart:fill-luxury-gold transition-all duration-300" />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="p-6 bg-luxury-charcoal/50">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-luxury-white text-lg leading-tight group-hover:text-luxury-softWhite transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Star className="w-5 h-5 fill-luxury-gold text-luxury-gold animate-bounce-gentle" />
            <span className="text-sm text-luxury-softWhite font-semibold">4.8</span>
          </div>
        </div>
        
        <p className="text-luxury-softWhite/80 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-luxury-muted uppercase tracking-wide font-medium">Category</span>
            <span className="text-sm font-bold text-luxury-gold capitalize">
              {product.category}
            </span>
          </div>
          {product.function_type && (
            <div className="flex flex-col text-right">
              <span className="text-xs text-luxury-muted uppercase tracking-wide font-medium">Function</span>
              <span className="text-sm font-bold text-luxury-softWhite capitalize">
                {product.function_type}
              </span>
            </div>
          )}
        </div>
        
        {product.is_for_sale && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-luxury-gold">
                Rs{product.price.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;