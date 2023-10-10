// pages/AdminLayout.js

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Sidebar } from '../admin/shred/Sidebar';
import { Header } from '../admin/Header';
import { HiOutlineViewGrid } from 'react-icons/hi';
import {  IoFileTray, IoImageOutline, IoImages, IoInformationCircle, IoPeople, IoPeopleCircle, IoPeopleOutline, IoRadioButtonOnOutline, IoSchoolOutline } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { ContactPageOutlined, EmailOutlined } from '@mui/icons-material';

export const AdminLayoutComponent = ({ title,currentUser, buttons = "", children }) => {

    const DASHBOARD_SIDEBAR_LINKS = [
        {
            key:'schools',
            label:'Schools',
            path: '/user/schools',
            icon: <IoSchoolOutline/>
        },
        {
            key:'notices',
            label:'Notices',
            path: '/user/notices',
            icon: <IoInformationCircle/>
        },
        {
            key:'users',
            label:'Users',
            path: '/user/users',
            icon: <IoPeopleCircle/>
        },
        {
            key:'members',
            label:'Members',
            path: '/user/members',
            icon: <IoPeopleOutline/>
        },
        {
            key:'students',
            label:'Students',
            path: '/user/students',
            icon: <IoPeople />
        },
        {
            key:'scholarship-application-status',
            label:'Scholarship Application',
            path: '/scholarship-application-status/update-form',
            icon: <IoRadioButtonOnOutline />
        },
        {
            key:'download-files',
            label:'Download Files',
            path: '/user/download-files',
            icon: <IoFileTray/>
        },
        {
            key:'images',
            label:'BackgroundImages',
            path: '/user/background-images',
            icon: <IoImages/>
        },
        {
            key:'logo',
            label:'Logo',
            path: '/logo',
            icon: <IoImageOutline/>
        },
        {
            key:'about',
            label:'About',
            path: '/about-details/update-form',
            icon: <IoImageOutline/>
        },
        {
            key:'contact',
            label:'Contact',
            path: '/contact/update-form',
            icon: <ContactPageOutlined/>
        }
    ]

  // Function to handle user logout
    const logout=()=>{
        axios.post('/user/logout').then(()=>{
            toast.success('Logged out successfully')
            router.visit('/auth/login-choose-user')
        })
    }

    useEffect(()=>{
        if(!currentUser){
            router.visit('/user-login-form');
        }
    })



    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const handleSidebarToggle = () => {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };


    return (
        <div className='flex flex-row bg-neutral-100 h-screen w-screen'>
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

          <div className='flex-col h-screen flex flex-1'>
            {/* Header component */}
            <Header logout={logout} currentUser={currentUser} onSidebarToggle={handleSidebarToggle} />

              {/* Children container with fixed width and height */}
              <div className="min-h-0 mt-5 w-screen h-full overflow-auto md:w-[112rem] flex flex-col space-y-3 pt-6 px-2">
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
                <Toaster/>
                {/* Outlet to render child routes */}
                <div>{children}</div>

              </div>
            </div>
        </div>
      );

};
