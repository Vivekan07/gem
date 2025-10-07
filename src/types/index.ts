export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number; // Optional, only for sale items
  category: 'bridal' | 'necklace' | 'aharam' | 'earrings' | 'bangles' | 'other';
  imageUrl: string;
  isForSale: boolean; // true = sale, false = rent
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  displayName?: string;
}

export interface AdminStats {
  totalProducts: number;
  totalCategories: number;
  rentProducts: number;
  saleProducts: number;
}

export type CategoryType = 'bridal' | 'necklace' | 'aharam' | 'earrings' | 'bangles' | 'other';

export const CATEGORIES: { [key in CategoryType]: { name: string; icon: string } } = {
  bridal: { name: 'Bridal Collection', icon: '👰' },
  necklace: { name: 'Necklace', icon: '💎' },
  aharam: { name: 'Aharam', icon: '✨' },
  earrings: { name: 'Earrings', icon: '💫' },
  bangles: { name: 'Bangles', icon: '⭐' },
  other: { name: 'Other Accessories', icon: '🌟' }
};