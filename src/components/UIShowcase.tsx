import React from 'react';
import { Gem, Search, Filter, Star, Heart, ShoppingBag, Eye, Sparkles, Users, Settings, User, LogOut, Plus, Package, TrendingUp } from 'lucide-react';

const UIShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header Preview */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm p-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Rishwi Gem Stone Gallery</h1>
                <p className="text-xs text-gray-600">Premium Jewelry Collection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex rounded-lg bg-gray-100 p-1 shadow-sm">
                <button className="px-3 py-1 rounded-md text-sm font-medium bg-white text-gray-900 shadow-sm flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Customer</span>
                </button>
                <button className="px-3 py-1 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center space-x-1">
                  <Settings className="w-4 h-4" />
                  <span>Admin</span>
                </button>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                <User className="w-4 h-4" />
                <span className="font-medium">admin@rishvigems.com</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Admin</span>
              </div>
              <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors border border-gray-200 rounded-lg hover:border-red-200">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section Preview */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-orange-100/50 rounded-3xl -z-10"></div>
          <div className="py-12 px-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-amber-500 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">Exquisite Jewelry Collection</h2>
              <Sparkles className="w-8 h-8 text-amber-500 ml-3" />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handcrafted jewelry pieces, perfect for every occasion and celebration
            </p>
            <div className="flex items-center justify-center space-x-8 mt-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span>Handcrafted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span>Traditional Designs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Preview */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jewelry..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
              <option>All Categories</option>
              <option>Necklace</option>
              <option>Aharam</option>
              <option>Earings</option>
              <option>Hip Belt</option>
              <option>Bangles</option>
              <option>Bridal Collection</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
              <option>All Functions</option>
              <option>Birthday Party</option>
              <option>Kovil</option>
              <option>Preshoot</option>
              <option>Postshoot</option>
              <option>Bridetobe</option>
              <option>Mehindi</option>
            </select>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500" />
              <label className="text-sm text-gray-700">
                <Eye className="w-4 h-4 inline mr-1" />
                Showcase Only
              </label>
            </div>
          </div>
        </div>

        {/* Category Pills Preview */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            All
          </button>
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-200">
            Necklace
          </button>
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-200">
            Aharam
          </button>
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-200">
            Earings
          </button>
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-amber-50 border border-gray-200 hover:border-amber-200">
            Bridal Collection
          </button>
        </div>

        {/* Stats Bar Preview */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-amber-600" />
                <span className="text-gray-700">
                  <span className="font-semibold text-amber-600">6</span> Available for Purchase
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-orange-600" />
                <span className="text-gray-700">
                  <span className="font-semibold text-orange-600">2</span> Showcase Items
                </span>
              </div>
            </div>
            <div className="text-gray-600">
              Showing <span className="font-semibold">8</span> of <span className="font-semibold">8</span> items
            </div>
          </div>
        </div>

        {/* Product Cards Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {/* Sample Product Card 1 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg"
                alt="Golden Temple Necklace"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Available
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                  Golden Temple Necklace
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                Exquisite gold-plated temple jewelry necklace with intricate goddess motifs
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Category</span>
                  <span className="text-sm font-medium text-amber-600 capitalize">necklace</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-sm text-gray-500">Function</span>
                  <span className="text-sm font-medium text-orange-600 capitalize">kovil</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">₹15,000</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Product Card 2 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg"
                alt="Diamond Bridal Set"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Available
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                  Diamond Bridal Set
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                Complete bridal jewelry set with matching necklace, earrings, and bangles
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Category</span>
                  <span className="text-sm font-medium text-amber-600 capitalize">bridal collection</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-sm text-gray-500">Function</span>
                  <span className="text-sm font-medium text-orange-600 capitalize">bridetobe</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">₹75,000</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Product Card 3 - Showcase Only */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1454168/pexels-photo-1454168.jpeg"
                alt="Traditional Aharam"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Showcase
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                  Traditional Aharam
                </h3>
                <div className="flex items-center space-x-1 ml-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                Long traditional South Indian aharam with semi-precious stones
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Category</span>
                  <span className="text-sm font-medium text-amber-600 capitalize">aharam</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-sm text-gray-500">Function</span>
                  <span className="text-sm font-medium text-orange-600 capitalize">bridetobe</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">Rs25,000</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Panel Preview */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Admin Panel Preview</h2>
              <p className="text-gray-600">Product management interface</p>
            </div>
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center space-x-2 shadow-sm hover:shadow-md">
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <Package className="w-8 h-8 text-amber-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">For Sale</p>
                  <p className="text-2xl font-bold text-green-600">6</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">For Rent Only</p>
                  <p className="text-2xl font-bold text-blue-600">2</p>
                </div>
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-orange-600">6</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Preview */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Gem className="w-6 h-6 text-amber-500" />
              <span className="text-lg font-semibold text-gray-900">Rishwi Gem Stone Gallery</span>
            </div>
            <p className="text-gray-600 text-sm">
              Premium jewelry collection for every special occasion
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2025 Rishwi Gem Stone Gallery. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UIShowcase;