import React, { useState } from 'react';
import type { RootState } from '../store/configure_store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Logo from '../public/soundstudio_1_logo.png';
import { openCart } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Navbar = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const getCart = useAppSelector((state: RootState) => state.cart.cart);
  const currentRoute = router.pathname.slice(1, -1);

  // control cart
  const navigation = [
    {
      name: 'Headphones',
      href: 'headphones',
    },
    {
      name: 'Earbuds',
      href: 'earbuds',
    },
  ];
  return (
    <>
      <nav className='flex w-auto justify-between items-center h-16 bg-gray-200 drop-shadow-md px-10  text-slate-900 xl:text-xl lg:text-lg md:text-base sm:text-xm font-bold'>
        <Link href='/' className='px-2 py-1 rounded-md cursor-pointer'>
          <Image src={Logo} alt={'sound studio Logo'} width='280' height='70' />
        </Link>
        <div className='flex xl:gap-15 lg:gap-10 md:gap-5 sm:gap-2'>
          {navigation.map((menu) => {
            return (
              <div
                key={crypto.randomUUID()}
                className='flex justify-center hover:bg-slate-300 px-2 py-1 rounded-md
                '
              >
                <a href={`/${menu.href}`} className={`${currentRoute == menu.href ? 'underline-offset-4' : ''}`}>
                  {menu.name}
                </a>
              </div>
            );
          })}
        </div>
        <div className='flex xl:text-xl lg:gap-3 md:gap-2 sm:gap-1.5 xs:gap-1 items-center text-center'>
          {/* <div>
            <Link href='#' className='hover:bg-slate-200 px-2 py-1 rounded-md'>
              Sign In
            </Link>
          </div> */}
          <section
            onClick={() => {
              dispatch(openCart());
            }}
            className='hover:bg-slate-200 px-2 py-1 rounded-md relative cursor-pointer'
          >
            <div>
              <div style={{ borderRadius: '50%' }} className='flex justify-center items-center absolute bg-red-700 drop-shadow-xl text-slate-100 text-sm w-5 h-5 top-1 right-1'>
                {getCart?.length ? getCart?.length : 0}
              </div>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='stroke-2 w-8 h-8'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
              </svg>
            </div>
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
