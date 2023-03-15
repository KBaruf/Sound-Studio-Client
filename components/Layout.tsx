import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }: any) => {
  return (
    <div className='relative'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
