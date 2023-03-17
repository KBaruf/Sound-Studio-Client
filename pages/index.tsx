import React from 'react';
import BestSelling from '@/components/BestSelling';
import HeroBanner from '../components/HeroBanner';
import Brands from '@/components/Brands';
import Layout from '@/components/Layout';
import FooterBanner from '@/components/FooterBanner';
import Cart from '@/components/Cart';
import { client } from '../lib/client';
import { sanityDataTypes } from '@/types';
import type { RootState } from '../store/configure_store';
import { useAppSelector } from '../store/hooks';

const Home = ({ products, bannerData }: sanityDataTypes) => {
  const getIsCartOpen = useAppSelector((state: RootState) => state.cart.cartIsOpen);

  return (
    <Layout>
      {getIsCartOpen && <div className='absolute h-full w-full top-0 bottom-0 bg-black opacity-40 z-10'>{''}</div>}
      {getIsCartOpen && <Cart products={products} />}
      <HeroBanner {...bannerData} />
      <BestSelling {...products} />
      <hr className='border-1 border-red-700' />
      <Brands />
      <FooterBanner {...bannerData} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products: products.length && products, bannerData: bannerData.length && bannerData },
  };
}
export default Home;
