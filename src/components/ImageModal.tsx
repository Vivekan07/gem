import React from 'react';
import { X, Download, Heart, Share2 } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  productName: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, productName, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${productName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 bg-luxury-black/95 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-luxury-charcoal/80 backdrop-blur-sm text-luxury-gold hover:text-luxury-amber p-3 rounded-full hover:bg-luxury-gold/20 transition-all duration-300 border border-luxury-gold/30 hover:border-luxury-gold hover:scale-110 animate-glow"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 left-6 z-10 flex space-x-3">
          <button
            onClick={handleDownload}
            className="bg-luxury-charcoal/80 backdrop-blur-sm text-luxury-gold hover:text-luxury-amber p-3 rounded-full hover:bg-luxury-gold/20 transition-all duration-300 border border-luxury-gold/30 hover:border-luxury-gold hover:scale-110"
          >
            <Download className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-luxury-charcoal/80 backdrop-blur-sm text-luxury-gold hover:text-luxury-amber p-3 rounded-full hover:bg-luxury-gold/20 transition-all duration-300 border border-luxury-gold/30 hover:border-luxury-gold hover:scale-110"
          >
            <Heart className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-luxury-charcoal/80 backdrop-blur-sm text-luxury-gold hover:text-luxury-amber p-3 rounded-full hover:bg-luxury-gold/20 transition-all duration-300 border border-luxury-gold/30 hover:border-luxury-gold hover:scale-110"
          >
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Product Name */}
        <div className="absolute bottom-6 left-6 z-10">
          <div className="bg-luxury-charcoal/80 backdrop-blur-sm px-6 py-3 rounded-full border border-luxury-gold/30">
            <h3 className="text-luxury-gold font-bold text-lg">{productName}</h3>
          </div>
        </div>

        {/* Main Image */}
        <div className="relative w-full h-full flex items-center justify-center p-16">
          <img
            src={imageUrl}
            alt={productName}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border-2 border-luxury-gold/30 animate-scale-in"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/WhatsApp Image 2025-09-29 at 16.29.12_6c59f301 copy copy copy.jpg';
            }}
          />
        </div>

        {/* Navigation Hint */}
        <div className="absolute bottom-6 right-6 z-10">
          <div className="bg-luxury-charcoal/80 backdrop-blur-sm px-4 py-2 rounded-full border border-luxury-gold/30">
            <p className="text-luxury-softWhite text-sm">Click outside to close</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;