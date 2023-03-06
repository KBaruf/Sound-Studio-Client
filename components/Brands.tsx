import React from 'react';
import Image from 'next/image';
import { PopularBrands } from '../assets/brands/index';
const Brands = () => {
  return (
    <section>
      <h1 className='font-bold text-[44px] text-center text-slate-700'>Popular Brands</h1>
      <div className='flex justify-center min-w-full h-auto'>
        {Object.values(PopularBrands).map((img) => {
          return (
            <div key={crypto.randomUUID()}>
              <Image src={img} alt={'brands'} width='240' height='240' />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Brands;
