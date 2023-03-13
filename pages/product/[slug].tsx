import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Ratings from '@/components/Ratings';
import SimilarProducts from '@/components/SimilarProducts';
import RandomRating from '../../components/RandomRating';
import type { RootState } from '../../store/configure_store';
import { addToCart, removeItem, totalItems, totalAMount } from '../../store/cartSlice';
import { useAppDispatch } from '../../store/hooks';

const ProductDetails = ({ products, product }: { products: any; product: any }) => {
  // destructure products from sanity
  const { image, name, details, price, rating, _id } = product[0];

  const [cartItems, setCartItems] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  // get Items to be store on local Storage
  const getItemsCount = useSelector((state: RootState) => state.cart.total_items);
  const getAmount = useSelector((state: RootState) => state.cart.total_amount);
  const getCart = useSelector((state: RootState) => state.cart.cart);

  // Handles cart increment
  const addItemHandler = () => {
    setCartItems((cartItems): any => {
      if (cartItems?.filter((item) => item.id === _id) == null) {
        return [
          ...cartItems,
          {
            id: _id,
            quantity: 1,
          },
        ];
      } else {
        cartItems?.map((item) => {
          if (item.id === _id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        });
      }
    });
    console.log(cartItems);
  };
  // handle cart decrement
  const removeItemHandler = () => {
    let temp = 0;
    cartItems.find((item) => {
      if (item.id === _id) {
        setCartItems((cartItems) => cartItems.map((item) => item.count - 1, ...cartItems));
      } else {
        setCartItems([
          {
            id: _id,
            count: temp - 1,
          },
        ]);
      }
    });
  };

  // Add to local storage on addToCart button is clicked
  const addToCartHandler = () => {};

  return (
    <Layout>
      <div key={crypto.randomUUID()} className='flex-grow w-full text-slate-700'>
        <section className='flex w-full  justify-center items-cente gap-20 p-8'>
          <div className='w-[36rem] bg-gray-white outline-dashed rounded-lg cursor-pointer hover:scale-105 ease-in-out duration-300 '>
            <img className='m-auto h-[30rem] w-[30rem] py-6' src={`${urlFor(image && image[0])}`} alt={name} />
          </div>
          <div className='w-[30rem] px-4'>
            <h1 className='text-3xl font-extrabold'>{name}</h1>
            <div className='flex items-center gap-4'>
              <div className='h-14 flex flex-col justify-center'></div>
              {rating ? Ratings(rating) : Ratings(4)} <span className='block font-bold text-lg'>{RandomRating()}</span>
            </div>
            <div className='h-60 flex flex-col justify-center'>
              <h1 className='font-bold py-2'>Details</h1>
              <p>{details}</p>
            </div>
            <h1 className='text-red-700 py-4 font-extrabold text-xl'>${price}</h1>
            <div className='flex h-8 text-xl font-bold'>
              <h1 className='mr-4 font-bold text-xl'>Quantity:</h1>{' '}
              <div className='flex justify-center items-center text-center cursor-pointer  '>
                <span className='w-14 h-8 bg-white border-2 drop-shadow-md hover:scale-105 ease-in-out duration-300 hover:bg-slate-200 ' onClick={removeItemHandler}>
                  -
                </span>
                <span className='w-14 h-8 bg-white border-2 border-x-0 b-red-900 '>0</span>
                <span className='w-14 h-8 bg-white border-2 hover:scale-105 ease-in-out duration-300 drop-shadow-md hover:bg-slate-200 ' onClick={addItemHandler}>
                  +
                </span>
              </div>
            </div>
            <div className='flex justify-start items-center gap-8 mt-14 text-lg  font-bold pt-4'>
              <button className='w-44 h-10 border-2 rounded-lg drop-shadow-md hover:scale-105 ease-in-out duration-300 hover:bg-slate-200' onClick={addToCartHandler}>
                Add to Cart
              </button>
              <button className='w-44 h-10 rounded-lg bg-red-700 text-white drop-shadow-md hover:scale-105 ease-in-out duration-300 '>Buy Now</button>
            </div>
          </div>
        </section>
      </div>
      <SimilarProducts products={products} />
    </Layout>
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
