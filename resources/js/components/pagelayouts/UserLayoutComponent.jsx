import React from 'react';
import { Header } from '../user/Header';
import Footer from '../user/Footer';

const UserLayoutComponent = ({ title, children }) => {
  const navigation = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Notices", to: "/notices" },
    { name: "Downloads", to: "/downloads" },
    { name: "Contact", to: "/contact" },
  ];



  return (
    <div className='flex flex-col min-h-screen w-screen overflow-hidden'>
      <div className='fixed top-0 left-0 w-full z-10 bg-white h-[69px]'>
        <Header navigation={navigation} />
      </div>

      <div className='flex flex-1 flex-col justify-start items-start w-full mx-auto sm:px-4 lg:px-4 mt-[69px]'>
        {/* Title of the user layout */}
        <h2 className='font-bold text-xl text-purple-800 leading-tight font-serif'>{title}</h2>

        {/* Container for the content */}
        <div className='w-full'>
          {/* Render the child components passed as children */}
          {children}
        </div>
      </div>

      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  );
};

export default UserLayoutComponent;
