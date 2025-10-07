import React, { useState } from 'react';
import { signIn, signUp } from '../lib/supabase';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (isSignup && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        await signUp(email, password);
        setSuccess('Admin account created successfully! You can now sign in.');
        setIsSignup(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        const { user } = await signIn(email, password);
        if (user) {
          onLoginSuccess(user.email || '');
        }
      }
    } catch (error: any) {
      setError(error.message || (isSignup ? 'Error creating account' : 'Invalid email or password'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    resetForm();
  };

  return (
    <div className="fixed inset-0 bg-luxury-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-luxury-charcoal rounded-2xl p-8 w-full max-w-md border border-luxury-gold/30 shadow-2xl animate-scale-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-luxury-gold">
            {isSignup ? 'Create Admin Account' : 'Admin Login'}
          </h2>
          <button
            onClick={onClose}
            className="text-luxury-gold hover:text-luxury-amber p-2 hover:bg-luxury-gold/10 rounded-lg transition-all duration-300"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4 animate-slide-down">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/20 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg mb-4 animate-slide-down">
            {success}
          </div>
        )}

        {!isSignup && (
          <div className="bg-luxury-gold/20 border border-luxury-gold/30 text-luxury-softWhite px-4 py-3 rounded-lg mb-4 animate-slide-down">
            <p className="text-sm font-bold mb-2 text-luxury-gold">Demo Credentials:</p>
            <p className="text-sm font-mono">Email: admin@rishvigems.com</p>
            <p className="text-sm font-mono">Password: admin123</p>
            <p className="text-sm mt-2 text-luxury-softWhite">Or create a new admin account below</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-bold text-luxury-softWhite mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-luxury-gold w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold text-luxury-white placeholder-luxury-muted transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-luxury-softWhite mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-luxury-gold w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-14 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold text-luxury-white placeholder-luxury-muted transition-all duration-300"
                placeholder="Enter your password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-luxury-gold hover:text-luxury-amber transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isSignup && (
            <div>
              <label className="block text-sm font-bold text-luxury-softWhite mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-luxury-gold w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-14 py-3 bg-luxury-black/50 border border-luxury-gold/30 rounded-lg focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold text-luxury-white placeholder-luxury-muted transition-all duration-300"
                  placeholder="Confirm your password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-luxury-gold hover:text-luxury-amber transition-colors duration-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-luxury-gold text-luxury-black py-4 px-6 rounded-lg font-bold hover:bg-luxury-amber transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-luxury-gold/30 animate-glow"
          >
            {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-luxury-gold hover:text-luxury-amber text-sm font-bold transition-colors duration-300"
          >
            {isSignup ? 'Already have an account? Sign In' : 'Need to create an admin account? Sign Up'}
          </button>
        </div>

        {isSignup && (
          <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <p className="text-sm text-green-300">
              <strong>Creating Admin Account:</strong><br />
              This will create a new admin account that can manage all jewelry products. In demo mode, this creates a local account for testing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;