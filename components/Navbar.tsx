import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const styles = {
    active: 'bg-gray-300 px-2 py-1 rounded-md',
    nonActive: 'text-slate-900',
  };
  const navigation = [
    {
      name: 'New Arrivals',
      href: 'new-arrivals',
    },
    {
      name: 'Wireless',
      href: 'wireless',
      current: false,
    },
    {
      name: 'Over-Ear',
      href: 'over-ear',
    },
    {
      name: 'Earbuds',
      href: 'earbud',
    },
  ];
  return (
    <nav className='flex w-auto justify-between items-center h-16 bg-gray-200 drop-shadow-md px-10  text-slate-900 lg:text-xl md:text-base sm:text-xm font-bold'>
      <Link href='/' className='hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer'>
        Logo
      </Link>
      <div className='flex w- xl:gap-25 lg:gap-20 md:gap-15 sm:gap-5'>
        {navigation.map((menu) => {
          return (
            <div
              key={crypto.randomUUID()}
              className='flex justify-center hover:bg-slate-200 px-2 py-1 rounded-md
                '
            >
              <Link href={menu.href} className={currentRoute === '/' ? styles.active : styles.nonActive}>
                {menu.name}
              </Link>
            </div>
          );
        })}
      </div>
      <div className='flex lg:gap-8 md:gap-6 sm:gap-3 xs:gap-2 items-center'>
        <div>
          <Link href='#' className='hover:bg-slate-200 px-2 py-1 rounded-md'>
            Sign In
          </Link>
          {/* <Link href='#'>Create Account</Link> */}
        </div>
        <div className='hover:bg-slate-200 px-2 py-1 rounded-md relative'>
          <Link href='#'>
            <div style={{ borderRadius: '50%' }} className='flex justify-center items-center absolute bg-red-700 drop-shadow-xl text-slate-100 text-sm w-5 h-5 top-1 right-1'>
              10
            </div>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='stroke-2 w-8 h-8'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
