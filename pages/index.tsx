import React from 'react';
import BestSelling from '@/components/BestSelling';
import HeroBanner from '../components/HeroBanner';
import Brands from '@/components/Brands';
import Layout from '@/components/Layout';
import FooterBanner from '@/components/FooterBanner';
import { client } from '../lib/client';
import { sanityDataTypes } from '@/types';

const Home = ({ products, bannerData }: sanityDataTypes) => {
  return (
    <Layout>
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
