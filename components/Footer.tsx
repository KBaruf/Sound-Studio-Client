import React from 'react';
import { sanityDataTypes } from '@/types';
import Image from 'next/image';
import { urlFor } from '@/lib/client';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import Logo from '../public/soundstudio_1_logo.png';
import { Soundwaves } from '../assets/';
const Footer = (bannerData: sanityDataTypes['bannerData']) => {
  const footerBanner = Object.values(bannerData).splice(1, 2);
  return (
    <div className='relative min-w-full h-96 bg-red-700 m-4 mb-8 rounded-lg'>
      <Image className='absolute bottom-8 right-1/2 translate-x-1/2' src={Soundwaves} alt={'soundwaves'} width='480' height='480' />
      {footerBanner.map((banner) => {
        return (
          <div key={crypto.randomUUID()} className='flex justify-between items-center h-full px-8 pt-4'>
            <div className='w-64 pt-8 text-white'>
              <p className='text-lg font-bold'>20% OFF</p>
              <h1 className='font-extrabold text-8xl py-4 px-2'>HYPER SYSTEM</h1>
              <p className='py-6'>{new Date().toLocaleDateString()}</p>
            </div>
            <div className='w-64 text-white'>
              <p className='text-lg'>Beats Studio3</p>
              <h1 className='font-extrabold text-7xl py-2'>Spring Sale</h1>
              <p className='text-lg py-6'>Headphones like no other</p>
              <button className='text-lg text-red-700 bg-white rounded-xl w-24 h-8'>Shop Now</button>
            </div>
            <img className='absolute -top-16 right-1/2 translate-x-1/2 z-10' src={urlFor({ ...banner.image })} alt={banner.smallText} width='480' height='480' />
          </div>
        );
      })}
      <div className=' flex justify-between items-center min-w-full h-14 m-4 text-xl'>
        <Image src={Logo} alt={'Sound Studio Logo'} width='220' height='30' />
        <div className='flex justify-center gap-4 py-5 '>
          <AiOutlineInstagram cursor='pointer' color='#334155' size={26} />
          <AiOutlineTwitter cursor='pointer' color='#334155' size={26} />
        </div>
        <div className='flex gap-8 py-4 px-2'>
          <p>&copy; {new Date().getFullYear()} Sound Studio. All Rights Reserved.</p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
