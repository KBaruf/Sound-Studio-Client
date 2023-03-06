import React from 'react';
import ScrollContainer from './ScrollContainer';
import { sanityDataTypes } from '../types';
const BestSelling = (products: sanityDataTypes['products']) => {
  return (
    <div className='relative text-center text-slate-700 w-full h-auto pb-6 inline-block py-6'>
      <p className='font-bold text-[44px]'>Best Selling Products</p>
      <p className='text-md font-normal'>Our headphones come in a variety of styles</p>
      <ScrollContainer {...products} />
    </div>
  );
};

export default BestSelling;
