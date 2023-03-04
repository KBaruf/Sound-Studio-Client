import React from 'react';
import { useRouter } from 'next/router';
import { client, urlFor } from '../../lib/client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const ProductDetails = ({ products, product }: { products: {}; product: any }) => {
  const { image, name, details, price } = product[0];
  return (
    <div>
      <Navbar />
      <img style={{ maxWidth: 'none' }} className='py-2 m-auto' src={`${urlFor(image && image[0])}`} alt='headphone' />
    </div>
  );
};
export async function getStaticPaths() {
  const query = `*[_type == "product"]{
    slug{
      current
    }
  }`;
  const products = await client.fetch(query);

  const paths = products.map((product: { slug: { current: string } }) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const productsQuery = `*[_type == "product"]`;
  const productQuery = `*[_type == "product" && slug.current == '${slug}']`;
  const allProducts = await client.fetch(productsQuery);
  const product = await client.fetch(productQuery);
  return {
    props: {
      products: allProducts.length && allProducts,
      product: product.length && product,
    },
  };
}
export default ProductDetails;
