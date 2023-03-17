import React from 'react';
import { client } from '../lib/client';
import ProductsLayout from '@/components/ProductsLayout';
import Cart from '@/components/Cart';
import type { RootState } from '../store/configure_store';
import { useAppSelector } from '../store/hooks';
const Earbuds = ({ products, allProducts }) => {
  const getIsCartOpen = useAppSelector((state: RootState) => state.cart.cartIsOpen);
  return (
    <div className='relative'>
      {getIsCartOpen && <div className='absolute h-full w-full top-0 bottom-0 bg-black opacity-40 z-10'>{''}</div>}
      {getIsCartOpen && <Cart products={allProducts} />}
      <ProductsLayout products={products} />
    </div>
  );
};
export async function getServerSideProps() {
  const productsQuery = `*[_type == "product" && category == "earbuds"]`;
  const products = await client.fetch(productsQuery);

  const allProductsQuery = '*[_type == "product"]';
  const allProducts = await client.fetch(allProductsQuery);
  return {
    props: { products: products.length && products, allProducts: allProducts.length && allProducts },
  };
}

export default Earbuds;
