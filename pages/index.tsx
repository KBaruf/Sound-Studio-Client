import BestSelling from '@/components/BestSelling';
import { type } from 'os';
import React from 'react';
import HeroBanner from '../components/HeroBanner';
import Navbar from '../components/Navbar';
import { client } from '../lib/client';
import { sanityDataTypes } from '@/types';

const Home = ({ products, bannerData }: sanityDataTypes) => {
  return (
    <div>
      <Navbar />
      <HeroBanner {...bannerData} />
      <BestSelling {...products} />
    </div>
  );
};
export async function getServerSideProps() {
  const productsQuery = `*[_type == "product"]`;
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products: products.length && products, bannerData: bannerData.length && bannerData[0] },
  };
}
export default Home;
