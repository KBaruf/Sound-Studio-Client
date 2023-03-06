import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Type for the slice state
interface CartState {
  cart: string | null;
  total_items: number;
  total_amount: number;
}

const getLocalstorage = () => {
  if (typeof window !== 'undefined') {
    let cart = localStorage.getItem('cart');
    if (cart) {
      return JSON.parse(localStorage.getItem('cart') || '');
    } else {
      return [];
    }
  }
};

const initialState: CartState = {
  cart: getLocalstorage(),
  total_items: 0,
  total_amount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload;
    },
    removeItem: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state, action) => {
      state.cart = action.payload;
    },
    totalItems: (state, action) => {
      state.total_items = state.total_items + action.payload;
    },
    totalAMount: (state, action) => {
      state.total_amount = state.total_amount + action.payload;
    },
  },
});

export const { addToCart, removeItem, clearCart, totalItems, totalAMount } = cartSlice.actions;

export default cartSlice.reducer;
