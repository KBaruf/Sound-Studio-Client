import React from 'react';
import { sanityDataTypes } from '@/types';
import Image from 'next/image';
import { urlFor } from '@/lib/client';
import { Soundwaves } from '../assets';
const FooterBanner = (bannerData: sanityDataTypes['bannerData']) => {
  const footerBanner = Object.values(bannerData).splice(1, 1);
  return (
    <section className='relative min-w-full h-96 bg-red-700 m-4 mb-4 rounded-lg'>
      <Image className='absolute bottom-8 right-1/2 translate-x-1/2' src={Soundwaves} alt={'soundwaves'} width='480' height='480' />
      {footerBanner.map((banner) => {
        return (
          <div key={banner._id} className='flex justify-between items-center h-full px-8 pt-4'>
            <div className='w-64 pt-8 text-white'>
              <p className='text-lg font-bold'>{banner.discount}</p>
              <h1 className='font-extrabold text-8xl py-4 px-2'>{banner?.largeText1.toUpperCase()}</h1>
              <p className='py-6'>{new Date().toLocaleDateString()}</p>
            </div>
            <div className='w-68 text-white'>
              <p className='text-lg'>{banner?.smallText}</p>
              <h1 className='font-extrabold text-7xl py-2'>{banner?.midText}</h1>
              <p className='text-lg py-6'>{banner?.desc}</p>
              <button className='text-lg text-red-700 bg-white rounded-lg drop-shadow-md w-24 h-8 hover:scale-105 ease-in-out duration-300'>Shop Now</button>
            </div>
            <img className='absolute -top-16 right-1/2 translate-x-1/2 z-10' src={urlFor({ ...banner.image })} alt={banner.smallText} width='480' height='480' />
          </div>
        );
      })}
    </section>
  );
};

export default FooterBanner;
