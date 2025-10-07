import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from 'lucide-react';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  textPosition: 'left' | 'right';
}

const slides: SlideData[] = [
  {
    id: 1,
    title: "Grace on Your Wrist",
    subtitle: "Celebrate beauty in every gesture",
    description: "Discover our exquisite collection of bangles and bracelets that add elegance to every movement",
    image: "/image copy copy copy copy copy copy copy copy.png",
    buttonText: "Shop Now",
    textPosition: 'left'
  },
  {
    id: 2,
    title: "Own the Spotlight",
    subtitle: "Illuminate your style with exquisite necklaces",
    description: "Discover our stunning collection of necklaces that make every moment shine with elegance and grace",
    image: "/download%20(16)%20copy.jpg",
    buttonText: "Shop Now",
    textPosition: 'left'
  },
  {
    id: 3,
    title: "Reasons Why Jewellery is Important To Modern-Day Women",
    subtitle: "Express your individuality with timeless pieces",
    description: "From everyday elegance to special occasions, find jewelry that speaks to your unique style and personality",
    image: "/download%20(15)%20copy.jpg",
    buttonText: "Explore Collection",
    textPosition: 'left'
  },
  {
    id: 4,
    title: "The 2025 Edit: 10 Jewellery Trends Everyone Will Be Wearing This Festive Season",
    subtitle: "Stay ahead with the latest jewelry trends",
    description: "Discover the must-have jewelry pieces that will define this festive season's fashion landscape",
    image: "/images%20(1)%20copy.jpg",
    buttonText: "View Trends",
    textPosition: 'left'
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  return (
    <div className="relative h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden rounded-3xl mb-16 shadow-2xl border-2 border-luxury-gold/30 animate-scale-in">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay - Lighter for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/70 via-luxury-charcoal/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className={`max-w-2xl ${slide.textPosition === 'right' ? 'ml-auto text-right' : ''}`}>
                  <div
                    className={`transform transition-all duration-1000 delay-300 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-12 opacity-0'
                    }`}
                  >
                    {/* Decorative element */}
                    <div className="flex items-center mb-6 animate-slide-up">
                      <Sparkles className="w-8 h-8 text-luxury-gold mr-3 animate-bounce-gentle" />
                      <div className="h-px bg-gradient-to-r from-luxury-gold via-luxury-amber to-transparent w-24"></div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-luxury-gold mb-6 leading-tight animate-glow">
                      {slide.title}
                    </h1>
                    
                    <p className="text-xl md:text-2xl lg:text-3xl text-luxury-softWhite mb-8 font-light leading-relaxed animate-slide-up">
                      {slide.subtitle}
                    </p>
                    
                    <p className="text-lg md:text-xl text-luxury-white/90 mb-10 leading-relaxed max-w-2xl animate-slide-up">
                      {slide.description}
                    </p>
                    
                    <button className="group bg-luxury-gold hover:bg-luxury-amber text-luxury-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-luxury-gold/40 flex items-center space-x-4 shadow-xl animate-glow">
                      <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
                      <span>{slide.buttonText}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-luxury-charcoal/30 backdrop-blur-md hover:bg-luxury-gold/20 text-luxury-softWhite hover:text-luxury-white p-5 rounded-full transition-all duration-300 hover:scale-110 shadow-xl border border-luxury-gold/30 hover:border-luxury-gold"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-luxury-charcoal/30 backdrop-blur-md hover:bg-luxury-gold/20 text-luxury-softWhite hover:text-luxury-white p-5 rounded-full transition-all duration-300 hover:scale-110 shadow-xl border border-luxury-gold/30 hover:border-luxury-gold"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 ${
              index === currentSlide
                ? 'w-16 h-4 bg-luxury-gold rounded-full shadow-lg animate-glow'
                : 'w-4 h-4 bg-luxury-gold/50 hover:bg-luxury-gold/75 rounded-full hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-luxury-charcoal/50">
        <div
          className="h-full bg-luxury-gold transition-all duration-500 shadow-lg animate-glow"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 bg-luxury-charcoal/50 backdrop-blur-md text-luxury-softWhite px-6 py-3 rounded-full text-base font-bold border border-luxury-gold/30">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default HeroSlider;