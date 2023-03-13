import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Type for the slice state
interface CartState {
  cart:
    | any
    | string
    | null
    | [
        {
          id: string;
          total_items: number;
          total_amount: number;
        }
      ];
  cartIsOpen: boolean;
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
  cart: [getLocalstorage()],
  cartIsOpen: false,
  total_items: 0,
  total_amount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart = [{ id: action.payload, total_items: state.total_items, total_amount: state.total_amount }] || state.cart;
      state.cartIsOpen = !state.cartIsOpen;
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
