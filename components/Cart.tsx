import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addToCart, removeItem, totalItems, totalAMount } from '../store/cartSlice';
const Cart = (id: string) => {
  const count = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  return <div>Cart</div>;
};

export default Cart;
