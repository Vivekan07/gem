import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { getProducts, type Product, categories, functions } from '../lib/supabase';
import ProductCard from './ProductCard';
import HeroSlider from './HeroSlider';
import PhotoCategoryMenu from './PhotoCategoryMenu';
import ImageModal from './ImageModal';
import { Search, Filter, Star, Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';

const CustomerView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [showSalesOnly, setShowSalesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{url: string, name: string} | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, debouncedSearchTerm, showSalesOnly]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(selectedCategory, debouncedSearchTerm, showSalesOnly);
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (imageUrl: string, productName: string) => {
    setSelectedImage({ url: imageUrl, name: productName });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-luxury-gold/20 border-t-luxury-gold mx-auto mb-6 animate-glow"></div>
            <p className="text-luxury-softWhite text-lg font-medium">Loading our beautiful collection...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Search and Filters */}
      <div className="bg-luxury-charcoal rounded-xl shadow-2xl p-8 mb-8 border border-luxury-gold/30 backdrop-blur-sm animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-luxury-gold w-5 h-5" />
            <input
              type="text"
              placeholder="Search jewelry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold text-luxury-white placeholder-luxury-muted transition-all duration-300 hover:border-luxury-gold/50"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold text-luxury-white transition-all duration-300 hover:border-luxury-gold/50"
          >
            <option value="all">Other Accessories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>


          {/* Sales Filter */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="salesOnly"
              checked={showSalesOnly}
              onChange={(e) => setShowSalesOnly(e.target.checked)}
              className="w-5 h-5 text-luxury-gold bg-luxury-black border-luxury-gold/30 rounded focus:ring-luxury-gold focus:ring-2"
            />
            <label htmlFor="salesOnly" className="text-sm text-luxury-softWhite font-medium flex items-center">
              <Eye className="w-5 h-5 inline mr-2 text-luxury-gold" />
              Rent Only
            </label>
          </div>
        </div>
      </div>

      {/* Photo Category Menu */}
      <PhotoCategoryMenu 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Stats Bar */}
      <div className="bg-luxury-charcoal/50 rounded-xl p-6 mb-8 border border-luxury-gold/20 backdrop-blur-sm animate-slide-up">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-luxury-gold animate-bounce-gentle" />
              <span className="text-luxury-softWhite font-medium">
                <span className="font-bold text-luxury-gold">
                  {filteredProducts.filter(p => p.is_for_sale).length}
                </span> Available for Purchase
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-luxury-gold animate-bounce-gentle" />
              <span className="text-luxury-softWhite font-medium">
                <span className="font-bold text-luxury-gold">
                  {filteredProducts.filter(p => !p.is_for_sale).length}
                </span> For Rent Items
              </span>
            </div>
          </div>
          <div className="text-luxury-softWhite font-medium">
            Showing <span className="font-bold text-luxury-gold">{filteredProducts.length}</span> of <span className="font-bold text-luxury-gold">{products.length}</span> items
          </div>
        </div>
      </div>
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <Sparkles className="w-20 h-20 text-luxury-gold/50 mx-auto mb-6 animate-float" />
          <h3 className="text-2xl font-bold text-luxury-softWhite mb-4">
            {products.length === 0 ? 'Collection Coming Soon' : 'No jewelry found'}
          </h3>
          <p className="text-luxury-muted text-lg">
            {products.length === 0 
              ? 'Our beautiful jewelry collection is being curated. Please check back soon!' 
              : 'Try adjusting your filters or search terms'
            }
          </p>
          {products.length === 0 && (
            <div className="mt-8">
              <div className="inline-flex items-center px-6 py-3 border border-luxury-gold/30 rounded-lg text-luxury-gold font-medium bg-luxury-gold/10 backdrop-blur-sm">
                <Star className="w-5 h-5 mr-2 animate-pulse" />
                New products will be added by our admin team
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onImageClick={handleImageClick}
            />
          ))}
        </div>
      )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        imageUrl={selectedImage?.url || ''}
        productName={selectedImage?.name || ''}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default CustomerView;