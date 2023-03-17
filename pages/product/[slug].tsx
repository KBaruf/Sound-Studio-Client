import React, { useEffect, useState } from 'react';
import { client, urlFor } from '../../lib/client';
import Layout from '@/components/Layout';
import Ratings from '@/components/Ratings';
import SimilarProducts from '@/components/SimilarProducts';
import Cart from '../../components/Cart';
import RandomRating from '../../components/RandomRating';
import type { RootState } from '../../store/configure_store';
import { addToCart, totalItems, openCart } from '../../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toast } from 'react-toastify';

const ProductDetails = ({ products, product }: { products: any; product: any }) => {
  const dispatch = useAppDispatch();

  // destructure products from sanity
  const { image, name, details, price, rating, _id } = product[0];

  // get Items to be store on local Storage
  const getCart = useAppSelector((state: RootState) => state.cart.cart);
  const getIsCartOpen = useAppSelector((state: RootState) => state.cart.cartIsOpen);

  // get Product Quantity;
  const addedQty = getCart?.find((item) => item.id === _id);

  // calculate total number of Items
  const calcTotalItemsHandler = () => {
    const totalCartItems = getCart.map((item) => {
      return item.quantity;
    });
    const totalItemsCount = totalCartItems.length && totalCartItems.reduce((acc: number, curr: number) => acc + curr);
    return totalItemsCount;
  };

  // Handles cart increment
  const incItemsHandler = () => {
    const cartController = (_id: string) => {
      if (getCart?.find((item) => item.id === _id)) {
        const cartItems = getCart?.map((cartProd) => {
          if (cartProd.id === _id) {
            return {
              ...cartProd,
              quantity: cartProd.quantity + 1,
              total: cartProd.quantity * price + price,
            };
          } else {
            return cartProd;
          }
        });
        return cartItems;
      } else {
        const cartItems = [
          ...getCart,
          {
            id: _id,
            quantity: 1,
            total: price,
          },
        ];
        return cartItems;
      }
    };
    dispatch(addToCart(cartController(_id)));
    dispatch(totalItems(calcTotalItemsHandler() + 1));
  };

  // handle cart decrement
  const decItemsHandler = () => {
    if (!getCart?.some((item) => item.id !== _id)) return;

    if (addedQty?.quantity <= 1) return;
    const cartController = (_id: string) => {
      if (getCart?.find((item) => item.id === _id)) {
        const cartItems = getCart?.map((cartProd) => {
          if (cartProd.id === _id) {
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

  // Add to local storage on addToCart button is clicked
  const addToCartHandler = () => {
    toast.success(`${addedQty?.quantity}  ${name} added to Cart`, {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: false,
    });
    localStorage.setItem('cart', JSON.stringify(getCart));
  };

  return (
    <div className='relative'>
      {getIsCartOpen && <div className='absolute h-full w-full top-0 bottom-0 bg-black opacity-40 z-10'>{''}</div>}
      {getIsCartOpen && <Cart products={products} />}
      <Layout>
        <div className='flex-grow w-full text-slate-700'>
          <section className='flex w-full  justify-center items-center gap-20 p-8'>
            <div className='w-[36rem] bg-gray-white outline-dashed rounded-lg cursor-pointer hover:scale-105 ease-in-out duration-300 '>
              <img className='m-auto h-[30rem] w-[30rem] py-6' src={`${urlFor(image && image[0])}`} alt={name} />
            </div>
            <div className='w-[30rem] px-4'>
              <h1 className='text-3xl font-extrabold'>{name}</h1>
              <div className='flex items-center gap-4'>
                <div className='h-14 flex flex-col justify-center'></div>
                {rating ? Ratings(rating) : Ratings(4)} <span className='flex gap-2 block font-bold text-lg'>{RandomRating()} Customer Reviews </span>
              </div>
              <div className='h-60 flex flex-col justify-center'>
                <h1 className='font-bold py-2'>Details</h1>
                <p>{details}</p>
              </div>
              <h1 className='text-red-700 py-4 font-extrabold text-xl'>${price}</h1>
              <div className='flex h-8 text-xl font-bold'>
                <h1 className='mr-4 font-bold text-xl'>Quantity:</h1>{' '}
                <div className='flex justify-center items-center text-center cursor-pointer  '>
                  <button className='w-14 h-8 bg-white border-2 drop-shadow-md hover:scale-105 ease-in-out duration-300 hover:bg-slate-200 ' onClick={decItemsHandler}>
                    -
                  </button>
                  <span className='w-14 h-8 bg-white border-2 border-x-0 b-red-900 '>{!getCart?.some((item) => item.id === _id) ? 0 : addedQty?.quantity}</span>
                  <button className='w-14 h-8 bg-white border-2 hover:scale-105 ease-in-out duration-300 drop-shadow-md hover:bg-slate-200 ' onClick={incItemsHandler}>
                    +
                  </button>
                </div>
              </div>
              <div className='flex justify-start items-center gap-8 mt-14 text-lg  font-bold pt-4'>
                <button className='w-44 h-10 border-2 rounded-lg drop-shadow-md hover:scale-105 ease-in-out duration-300 hover:bg-slate-200' onClick={addToCartHandler}>
                  Add to Cart
                </button>
                <button onClick={() => dispatch(openCart())} className='w-44 h-10 rounded-lg bg-red-700 text-white drop-shadow-md hover:scale-105 ease-in-out duration-300 '>
                  Buy Now
                </button>
              </div>
            </div>
          </section>
        </div>
        <SimilarProducts products={products} />
      </Layout>
    </div>
  );
};

export async function getStaticPaths() {
  const query = `*[_type == "product"]{
    slug{
      current
    }
  }`;
  const products = await client.fetch(query);

  const paths = products.map((product: { slug: { current: string } }) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const productsQuery = `*[_type == "product"]`;
  const productQuery = `*[_type == "product" && slug.current == '${slug}']`;
  const allProducts = await client.fetch(productsQuery);
  const product = await client.fetch(productQuery);
  return {
    props: {
      products: allProducts.length && allProducts,
      product: product.length && product,
    },
  };
}
export default ProductDetails;
