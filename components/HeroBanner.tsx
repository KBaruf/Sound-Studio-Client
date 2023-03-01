import React from 'react';
import Link from 'next/link';
const HeroBanner = () => {
  return (
    <div>
      <div className='w-full px-12 py-8 bg-gray-100'>
        <div>
          <p>Beats Solo</p> <h3>Wireless</h3>
        </div>
        <div>
          <h1>HEADPHONES</h1>
        </div>
        <div>
          <Link href='/'>
            <p>Shop wireless headphones</p>
          </Link>
          <p>Our headphones come in a variety of styles, from over-ear to in-ear, wireless to wired, and everything in between. We carry the latest models from top brands such as Bose, Sony, and Sennheiser, so you can trust that you &apos; re getting the best of the best.</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
