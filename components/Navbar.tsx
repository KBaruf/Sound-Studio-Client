import React from 'react';
import type { RootState } from '../store/configure_store';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Logo from '../public/soundstudio_1_logo.png';
const Navbar = () => {
  const itemsCount = useSelector((state: RootState) => state.cart.total_items);
  const router = useRouter();
  const currentRoute = router.pathname;

  const styles = {
    active: 'bg-gray-200 px-2 py-1 rounded-md',
    nonActive: 'text-slate-900',
  };
  const navigation = [
    {
      name: 'New Arrivals',
      href: 'new-arrivals',
    },
    {
      name: 'Headphones',
      href: 'headphones',
      current: false,
    },
    {
      name: 'Earbuds',
      href: 'earbud',
    },
    {
      name: 'Speakers',
      href: 'speakers',
    },
  ];
  return (
    <>
      <nav className='flex w-auto justify-between items-center h-16 bg-gray-200 drop-shadow-md px-10  text-slate-900 xl:text-xl lg:text-lg md:text-base sm:text-xm font-bold'>
        <Link href='/' className='hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer'>
          <Image src={Logo} alt={'sound studio Logo'} width='280' height='70' />
        </Link>
        <div className='flex xl:gap-15 lg:gap-10 md:gap-5 sm:gap-2'>
          {navigation.map((menu) => {
            return (
              <div
                key={crypto.randomUUID()}
                className='flex justify-center hover:bg-slate-400 px-2 py-1 rounded-md
                '
              >
                <Link href={menu.href} className={currentRoute === '/' ? styles.active : styles.nonActive}>
                  {menu.name}
                </Link>
              </div>
            );
          })}
        </div>
        <div className='flex xl:text-xl lg:gap-3 md:gap-2 sm:gap-1.5 xs:gap-1 items-center text-center'>
          <div>
            <Link href='#' className='hover:bg-slate-200 px-2 py-1 rounded-md'>
              Sign In
            </Link>
            {/* <Link href='#'>Create Account</Link> */}
          </div>
          <section className='hover:bg-slate-200 px-2 py-1 rounded-md relative'>
            <Link href='#'>
              <div style={{ borderRadius: '50%' }} className='flex justify-center items-center absolute bg-red-700 drop-shadow-xl text-slate-100 text-sm w-5 h-5 top-1 right-1'>
                {itemsCount}
              </div>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='stroke-2 w-8 h-8'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
              </svg>
            </Link>
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
