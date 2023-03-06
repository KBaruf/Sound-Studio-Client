import React from 'react';
import ScrollContainer from './ScrollContainer';
const SimilarProducts = ({ products }: any) => {
  return (
    <div className='mt-14 mb-24 relative text-center text-slate-700 w-full h-auto pb-6 inline-block py-2'>
      <div className='inline-block py-2'>
        <p className='font-bold text-[44px]'>You may also like </p>
      </div>
      <ScrollContainer {...products} />
    </div>
  );
};

export default SimilarProducts;
