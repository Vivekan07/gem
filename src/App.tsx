import React, { useState, useEffect } from 'react';
import { supabase, getCurrentUser, signOut, checkSupabaseConnection, onAuthStateChange } from './lib/supabase';
import CustomerView from './components/CustomerView';
import AdminView from './components/AdminView';
import LoginModal from './components/LoginModal';
import UIShowcase from './components/UIShowcase';
import { Gem, User, LogOut, Users, Settings } from 'lucide-react';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');
  const [showUIDemo, setShowUIDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    
    // Test Firebase connection on startup
    checkSupabaseConnection().then(connected => {
      if (connected) {
        console.log('🎉 Database ready for use!');
      } else {
        console.warn('⚠️ Database connection issues detected');
      }
    });

    // Set up auth state listener
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        setUser(user.email || '');
        setIsAdmin(true);
      } else {
        setUser(null);
        setIsAdmin(false);
        setViewMode('customer');
      }
      setLoading(false);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const checkUser = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setUser(user.email || '');
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAdmin(false);
      setViewMode('customer');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLoginSuccess = (email: string) => {
    setUser(email);
    setIsAdmin(true);
    setShowLogin(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Gem className="w-8 h-8 text-amber-600 animate-spin" />
          <span className="text-lg font-medium text-gray-700">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black animate-fade-in">
      {/* Header */}
      <header className="bg-luxury-black/95 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-luxury-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 animate-slide-down">
            <div className="flex items-center space-x-4 group">
              <img 
                src="/Rishwi Gemstone Gallery_Golden Logo Mockup_JPEG copy.jpg" 
                alt="Rishwi Gemstone Gallery Logo" 
                className="w-16 h-16 object-contain rounded-full border-2 border-luxury-gold p-1 group-hover:animate-glow transition-all duration-300"
              />
              <div>
                <h1 className="text-2xl font-bold text-luxury-gold group-hover:text-luxury-amber transition-all duration-300">
                  Rishwi Gem Stone Gallery
                </h1>
                <p className="text-sm text-luxury-softWhite font-medium tracking-wide">Premium Jewelry Collection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button
                    onClick={() => setShowUIDemo(!showUIDemo)}
                    className="px-4 py-2 text-sm text-luxury-softWhite hover:text-luxury-white transition-all duration-300 border border-luxury-gold/30 rounded-lg hover:border-luxury-gold hover:bg-luxury-gold/10 hover:shadow-lg hover:shadow-luxury-gold/20"
                  >
                    {showUIDemo ? 'Hide UI Demo' : 'Show UI Demo'}
                  </button>
                  {isAdmin && (
                    <div className="flex rounded-lg bg-luxury-charcoal p-1 shadow-sm">
                      <button
                        onClick={() => setViewMode('customer')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                          viewMode === 'customer'
                            ? 'bg-luxury-gold text-luxury-black shadow-lg shadow-luxury-gold/30'
                            : 'text-luxury-softWhite hover:text-luxury-white hover:bg-luxury-gold/10'
                        }`}
                      >
                        <Users className="w-4 h-4 mr-1" />
                        Customer
                      </button>
                      <button
                        onClick={() => setViewMode('admin')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                          viewMode === 'admin'
                            ? 'bg-luxury-gold text-luxury-black shadow-lg shadow-luxury-gold/30'
                            : 'text-luxury-softWhite hover:text-luxury-white hover:bg-luxury-gold/10'
                        }`}
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Admin
                      </button>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 text-sm text-luxury-softWhite bg-luxury-charcoal/50 px-4 py-2 rounded-lg border border-luxury-gold/20 backdrop-blur-sm">
                    <User className="w-4 h-4 text-luxury-gold" />
                    <span className="font-medium text-luxury-white">{user}</span>
                    <span className="text-xs bg-luxury-gold text-luxury-black px-3 py-1 rounded-full font-semibold">
                      {isAdmin ? 'Admin' : 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-luxury-softWhite hover:text-red-400 transition-all duration-300 border border-luxury-gold/30 rounded-lg hover:border-red-400/50 hover:bg-red-500/10 hover:shadow-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-luxury-gold text-luxury-black px-6 py-3 rounded-lg font-bold hover:bg-luxury-amber transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-luxury-gold/30 hover:scale-105 animate-glow"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-[calc(100vh-4rem)]">
        {showUIDemo ? (
          <UIShowcase />
        ) : viewMode === 'admin' && isAdmin ? (
          <AdminView />
        ) : (
          <CustomerView />
        )}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Footer */}
      <footer className="bg-luxury-black border-t border-luxury-gold/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4 animate-float">
              <Gem className="w-8 h-8 text-luxury-gold animate-bounce-gentle" />
              <span className="text-xl font-bold text-luxury-gold">Rishwi Gem Stone Gallery</span>
            </div>
            <p className="text-luxury-softWhite text-base font-medium mb-2">
              Premium jewelry collection for every special occasion
            </p>
            <p className="text-luxury-muted text-sm">
              © 2025 Rishwi Gem Stone Gallery. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;