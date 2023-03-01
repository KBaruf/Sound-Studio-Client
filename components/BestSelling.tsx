import React from 'react';
import Image from 'next/image';
import Image1 from '../assets/headphones_a_1.webp';
const BestSelling = () => {
  return (
    <div className='text-center text-slate-700 w-full h-auto'>
      <div className='inline-block py-6'>
        <p className='font-bold text-[44px]'>Best Selling Products</p>
        <p className='text-md font-normal'>Our headphones come in a variety of styles</p>
      </div>
      <div className=' flex justify-center flex-wrap  h-auto min-w-full '>
        {[
          { name: 'apple headphones', price: '$79', image: Image1 },
          { name: 'Boss', price: '$42' },
          { name: 'beat by Dre', price: '$43' },
          { name: 'JBL', price: '$30' },
        ].map((product) => {
          return (
            <div key={crypto.randomUUID()} className='relative mx-6 my-8  w-80 h-72 bg-gray-200 rounded-lg cursor-pointer'>
              <Image className='inline py-2' src={Image1.src} alt='headphone' width='275' height='275' />

              <div className='flex gap-4 absolute p-2 -bottom-10 '>
                <p className='text-md'>{product.name}</p>
                <p>{product.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BestSelling;
