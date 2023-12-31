// pages/AdminLayout.js

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Sidebar } from '../admin/shred/Sidebar';
import { Header } from '../admin/Header';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { IoPeopleCircle } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';
import { router } from '@inertiajs/react';
import axios from 'axios';

export const SchoolLayoutComponent = ({ title,currentUser, buttons = "", children }) => {

    const DASHBOARD_SIDEBAR_LINKS = [
        {
            key:'students',
            label:'Students',
            path: '/school/students',
            icon: <IoPeopleCircle/>
        }
    ]

  // Function to handle user logout
    const logout=()=>{
        axios.post('/school/logout').then(()=>{
            toast.success('Logged out successfully')
            router.visit('/auth/login-choose-user')
        })
    }

    useEffect(()=>{
        if(!currentUser){
            router.visit('/auth/school-login-form');
        }
    })



    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const handleSidebarToggle = () => {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };


    return (
        <div className='flex flex-row bg-neutral-100 h-screen'>
          {/* Sidebar component */}
          <motion.div
            className={`${
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } absolute inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:hidden`}
            initial={false}
            animate={{
              translateX: isMobileSidebarOpen ? 0 : "-100%",
            }}
          >
            <Sidebar logout={logout} handleSidebarToggle={handleSidebarToggle} DASHBOARD_SIDEBAR_LINKS={DASHBOARD_SIDEBAR_LINKS} />
          </motion.div>

          <div className='hidden md:block'>
            <Sidebar logout={logout} DASHBOARD_SIDEBAR_LINKS={DASHBOARD_SIDEBAR_LINKS} />
          </div>

          <div className='flex-col h-screen flex'>
            {/* Header component */}
            <Header logout={logout} currentUser={currentUser} onSidebarToggle={handleSidebarToggle} />

            <div className='min-h-0 flex-1 flex'>
              {/* Children container with fixed width and height */}
              <div className="w-screen overflow-auto md:w-[65rem] space-y-3 pt-6 px-2">
                <header className="bg-white shadow header">
                  <div className="flex mx-auto justify-between items-center w-full ">
                    {/* Title */}
                    <h1 className="text-2xl font-bold tracking-tight text-green-900">
                      {title}
                    </h1>

                    {/* Optional buttons */}
                    {buttons}
                  </div>
                </header>
                {/* Outlet to render child routes */}
                <div>{children}</div>
                <Toaster/>
              </div>
            </div>
          </div>
        </div>
      );

};
