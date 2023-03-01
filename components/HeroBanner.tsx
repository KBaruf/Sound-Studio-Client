import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroImg from '../assets/headphones_a_4.webp';
const HeroBanner = () => {
  return (
    <div className='text-slate-700'>
      <div className='relative px-12 py-6 bg-gray-200'>
        <Image className='h-1/2 w-1/2 xl:h-[28rem] xl:w-[28rem] lg:w-[26rem] lg:h-[26rem] md:h-[18rem] md:w-[18rem] sm:h-72 sm:w-72 absolute right-52 lg:right-1/3 md:right-18 sm:right-12 sm:bottom-40 lg:bottom-8 md:bottom-40 sm:bottom-20' src={HeroImg} alt='hero image' />
        <div>
          <p className='text-3xl'>Beats Solo</p> <h3 className='text-6xl pl-4 font-extrabold'>Wireless</h3>
        </div>
        <div className='py-3'>
          <h1 className='font-extrabold text-white text-9xl lg:text-8xl md:text-7xl sm:text-6xl'>HEADPHONES</h1>
        </div>
        <div className='flex justify-between w-full h-full pt-10'>
          <button className='mt-6 h-12 p-2  bg-red-700 rounded-xl'>
            <p className='text-white text-xl'>Shop wireless headphones</p>
          </button>
          <div className='w-96 h-auto md:w-90 sm:w-80'>
            <h4 className='font-bold text-center'>Description</h4>
            <p className='text-right text-sm py-1'>Our headphones come in a variety of styles, from over-ear to in-ear, wireless to wired, and everything in between. We carry the latest models from top brands such as Bose, Sony, and Sennheiser, so you can trust that you &apos; re getting the best of the best.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
