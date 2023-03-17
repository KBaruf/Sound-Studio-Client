import React, { useState } from 'react';
import axios from 'axios';
import type { RootState } from '../store/configure_store';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { urlFor } from '@/lib/client';
import Image from 'next/image';
import { EmptyCart } from '../assets';
import { addToCart, totalItems, openCart } from '../store/cartSlice';
import { toast } from 'react-toastify';
import getStripe from '@/utils/get-stripejs';
import { useRouter } from 'next/router';

const Cart = ({ products }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const getCart = useAppSelector((state: RootState) => state.cart.cart);
  // get products on the cart
  const cartItems = products?.filter((item) => {
    return getCart.some((prod) => {
      return item._id === prod?.id;
    });
  });
  // calculate total number of Items
  const calcTotalItemsHandler = () => {
    const totalCartItems = getCart.map((item) => {
      return item.quantity;
    });
    const totalItemsCount = totalCartItems.length && totalCartItems.reduce((acc: number, curr: number) => acc + curr);
    if (totalCartItems.length === 0) return 0;
    return totalItemsCount;
  };

  // calculate total cost
  const calcTotalAmount = () => {
    const totalCartItems = getCart?.map((item) => {
      return item.total;
    });
    const totalCost = totalCartItems.length && totalCartItems?.reduce((acc: number, curr: number) => acc + curr);
    return totalCost;
  };

  // increase Item Quantity
  const incQtyHandler = (_id, price) => {
    const cartController = (_id) => {
      if (getCart?.find((item) => item.id === _id)) {
        const cartItems = getCart?.map((cartProd) => {
          if (cartProd?.id === _id) {
            return {
              ...cartProd,
              quantity: cartProd.quantity + 1,
              total: cartProd.total + price,
            };
          } else {
            return cartProd;
          }
        });
        return cartItems;
      }
    };
    dispatch(addToCart(cartController(_id)));
    dispatch(totalItems(calcTotalItemsHandler() + 1));
  };
  // decrease item Quanitity
  const decQtyHandler = (_id, price) => {
    const cartController = (_id) => {
      if (getCart?.find((item) => item.id === _id)) {
        const cartItems = getCart?.map((cartProd) => {
          if (cartProd.id === _id) {
            if (cartProd.quantity === 1)
              return {
                ...cartProd,
                quantity: 1,
                total: price,
              };
            return {
              ...cartProd,
              quantity: cartProd.quantity - 1,
              total: cartProd.total - price,
            };
          } else {
            return cartProd;
          }
        });
        return cartItems;
      }
    };
    dispatch(addToCart(cartController(_id)));
    dispatch(totalItems(calcTotalItemsHandler() - 1));
  };

  // remove item from Cart
  const filterCart = (_id, name) => {
    toast.warn(`${name} removed From Cart`, {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: false,
    });
    const newCartItems = getCart.filter((item) => {
      if (item.id !== _id) {
        return item;
      }
    });
    localStorage.setItem('cart', JSON.stringify(newCartItems));
    dispatch(addToCart(newCartItems));
    dispatch(totalItems(calcTotalItemsHandler()));
  };

  //  Checkout With Stripe
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      router.push('/success');
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      router.push('/');
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await axios.post('/api/checkout_sessions', {
      headers: {
        'Content-Type': 'application/json',
      },
      cartItems: { cartItems, getCart },
    });
    if (response?.status === 500) return;
    const data = await response.data;
    if (typeof window !== 'undefined' && data) localStorage.clear();
    toast.loading('Redirecting...');

    stripe?.redirectToCheckout({
      sessionId: data.id,
    });
  };
  return (
    <>
      <div className='absolute bg-white  h-full w-2/5 top-0 bottom-0 pr-5 right-0 drop-shadow-lg z-20 text-slate-700'>
        {getCart.length > 0 && (
          <div className='flex gap-4 text-slate-700 text-2xl font-bold p-3 '>
            <span className='cursor-pointer' onClick={() => dispatch(openCart())}>
              {' '}
              &#60;
            </span>{' '}
            <p>Your Cart</p>
            <p className='text-red-700'>
              ({calcTotalItemsHandler()} {calcTotalItemsHandler() > 1 ? 'Units' : 'Unit'} of {getCart.length} {getCart.length > 1 ? 'Items' : 'Item'} )
            </p>
          </div>
        )}
        <div className=' flex p-3 flex-col gap-6 content-center '>
          {cartItems.length > 0 &&
            cartItems.map((item) => {
              return (
                <div key={item._id} className='relative flex gap-6'>
                  <div className='bg-gray-100 rounded-lg h-40 w-40'>
                    <img className='p-2' src={`${urlFor(item.image[0]).width(150).height(150)}`} alt={item.name} />
                  </div>
                  <div className='flex flex-col py-2 justify-between'>
                    <div className='text-justify text-slate-700 font-bold '>
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                    </div>
                    <div className='flex justify-center items-center text-center cursor-pointer font-bold '>
                      <button onClick={() => decQtyHandler(item._id, item.price)} className='w-14 h-8 bg-white border-2 drop-shadow-md hover:scale-105 ease-in-out duration-300 hover:bg-slate-200 '>
                        -
                      </button>
                      <span className='w-14 h-8 bg-white border-2 border-x-0 b-red-900 '>
                        {getCart.length &&
                          getCart.map((prod) => {
                            if (item._id === prod.id) {
                              return prod.quantity;
                            }
                          })}
                      </span>
                      <button onClick={() => incQtyHandler(item._id, item.price)} className='w-14 h-8 bg-white border-2 hover:scale-105 ease-in-out duration-300 drop-shadow-md hover:bg-slate-200 '>
                        +
                      </button>
                    </div>
                    <div onClick={() => filterCart(item._id, item.name)} className='flex justify-center items-center w-4 h-4  rounded-full border border-red-700 absolute top-0 right-0 text-red-700 cursor-pointer text-xs'>
                      X
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* Display total  */}
        {getCart.length > 0 && (
          <div className='flex flex-col items-center  w-full '>
            <div className='flex mt-10 p-6 gap-8 font-bold text-2xl'>
              <p className=''>Subtotal :</p>
              <span className='text-red-700'>${calcTotalAmount().toFixed(2)}</span>
            </div>
            <div className='flex justify-center w-full m-10 gap-16'>
              <button onClick={() => dispatch(openCart())} className='w-44 h-10 rounded-lg bg-red-700 text-white font-bold text-lg drop-shadow-md hover:scale-105 ease-in-out duration-300'>
                Continue Shopping
              </button>
              <button onClick={handleCheckout} className='w-44 h-10 rounded-lg bg-red-700 text-white font-bold text-lg drop-shadow-md hover:scale-105 ease-in-out duration-300'>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
        {/* display image if cart is empty */}
        {getCart.length == 0 && (
          <div className='flex flex-col gap-10 items-center p-4'>
            <Image src={EmptyCart} alt='Empty Cart' />
            <p className='text-center font-bold text-2xl text-slate-700'>Your Cart Is Empty</p>
            <button
              onClick={() => {
                dispatch(openCart());
                dispatch(addToCart([]));
                dispatch(totalItems(0));
              }}
              className='w-44 h-10 rounded-lg bg-red-700 text-white font-bold text-lg drop-shadow-md hover:scale-105 ease-in-out duration-300'
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
