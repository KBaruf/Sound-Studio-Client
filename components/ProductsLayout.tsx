import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import CurrencyFormat from '@/utils/CurrencyFormat';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductsLayout = ({ products }) => {
  return (
    <div className='relative'>
      <Navbar />
      <div className='relative text-center text-slate-700 w-full h-full h-auto pb-6 inline-block py-6'>
        <p className='font-bold text-[44px]'>{products[0].category.toUpperCase()}</p>
        <p className='text-md font-normal'>{`Supreme ${products[0].category} from top manufacturers`}</p>
      </div>
      <hr className='border-1 border-red-700' />
      <div className='w-full justify-center py-10 pb-20 gap-24 flex flex-wrap'>
        {Object.values(products).map((product: any) => {
          return (
            <div key={product._id} className='flex flex-col justify-between items-center'>
              <Link href={`/product/${product.slug.current}`} className='w-80 min-w-2/3 h-64 pt-2 bg-gray-200 rounded-lg cursor-pointer hover:scale-105 ease-in-out duration-300'>
                <img style={{ maxWidth: 'none' }} className='py-2 m-auto ' src={`${urlFor(product.image[0]).width(220).height(220)}`} alt='headphone' />
              </Link>
              <div className='py-2 font-semibold text-center'>
                <p className='text-md'>{product.name}</p>
                <p>{CurrencyFormat(product.price)}</p>
              </div>
            </div>
          );
        })}
      </div>
      <hr className='border-1 border-red-700' />
      <Footer />
    </div>
  );
};
export default ProductsLayout;
