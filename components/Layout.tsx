import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: any) => {
  return (
    <main className='flex flex-col h-screen justify-between'>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
