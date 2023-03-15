import React, { useRef } from 'react';
import Link from 'next/link';
import { sanityDataTypes } from '../types';
import { urlFor } from '@/lib/client';
import { sideScroll } from '../utils/scroll';
import CurrencyFormat from '@/utils/CurrencyFormat';
const ScrollContainer = (products: sanityDataTypes['products']) => {
  const contentWrapper: { current: any } = useRef(null);
  return (
    <div>
      {/* chevron left */}
      <div
        onClick={() => {
          sideScroll(contentWrapper.current, 5, 300, -10);
        }}
        className='absolute fixed left-0 top-[310px] z-10 cursor-pointer'
      >
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-10 h-10  stroke-2 stroke-red-700'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5' />
        </svg>
      </div>
      {/* chevron right */}
      <div
        onClick={() => {
          sideScroll(contentWrapper.current, 5, 300, 10);
        }}
        className='absolute fixed right-0 top-[310px] z-10 cursor-pointer'
      >
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-10 h-10 stroke-2 stroke-red-700'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5' />
        </svg>
      </div>
      <div ref={contentWrapper} className='relative overflow-x-scroll scroll flex m-auto h-auto min-w-full pb-8 '>
        {Object.values(products).map((product: any) => {
          return (
            <Link key={crypto.randomUUID()} href={`/product/${product.slug.current}`} className='mx-6 my-8 min-w-2/3 h-80 bg-gray-200 rounded-lg cursor-pointer hover:scale-105 ease-in-out duration-300'>
              <img style={{ maxWidth: 'none' }} className='py-2 m-auto ' src={`${urlFor(product.image[0]).width(300).height(300)}`} alt='headphone' />

              <div className='w-full py-2 font-semibold text-center bottom-0 '>
                <p className='text-md'>{product.name}</p>
                <p>{CurrencyFormat(product.price)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollContainer;
