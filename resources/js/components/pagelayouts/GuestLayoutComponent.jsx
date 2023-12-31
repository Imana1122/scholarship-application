import React, { useEffect } from 'react';
import ApplicationLogo from '../ApplicationLogo';

const GuestLayoutComponent = ({ title, children, scholarship }) => {


  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center sm:pt-0 bg-gray-100 space-y-5">
      {/* Logo */}
      <div>
       <ApplicationLogo className='h-[8rem]'/>
      </div>

      {/* Title (if provided) */}
      <h2 className='font-bold text-xl'>{title}</h2>

      {/* Container for the content */}
      <div className={`w-full mt-6 px-6 py-4 bg-white shadow-md sm:rounded-lg ${
        scholarship==='scholarship' ? `sm:max-w-3xl` : 'sm:max-w-md'
    }`}>
        {/* Render the child components passed as children */}
        {children}
      </div>
    </div>
  );
};

export default GuestLayoutComponent;
