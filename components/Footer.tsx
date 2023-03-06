import React from 'react';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import Logo from '../public/soundstudio_1_logo.png';
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className=' flex justify-between items-center min-w-full h-14 mx-4 text-xl'>
      <Image src={Logo} alt={'Sound Studio Logo'} width='220' height='30' />
      <div className='flex justify-center gap-4 py-2 '>
        <Link href='https://www.instagram.com/' rel='noopener noreferrer' target='_blank'>
          <AiOutlineInstagram cursor='pointer' color='#334155' size={26} />
        </Link>
        <Link href='https://twitter.com/' rel='noopener noreferrer' target='_blank'>
          <AiOutlineTwitter cursor='pointer' color='#334155' size={26} />
        </Link>
      </div>
      <div className='flex gap-8 py-2 px-2'>
        <p>
          &copy; {new Date().getFullYear()} Sound Studio by
          <Link target='_blank' rel='noopener noreferrer' href={'https://www.barufkosgei.com/'} className='font-bold text-red-700'>
            {' '}
            Baruf Kosgei
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
