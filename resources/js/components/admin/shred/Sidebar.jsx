import React, { useEffect } from 'react';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS} from '../const/navigation';
import { HiOutlineLogout } from 'react-icons/hi';
import classNames from 'classnames';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '../../ApplicationLogo';
import { TfiArrowCircleLeft } from 'react-icons/tfi';



export const Sidebar = ({ logout, DASHBOARD_SIDEBAR_LINKS, handleSidebarToggle }) => {
    const linkClasses = `flex items-center gap-2 font-light px-3 py-2 hover:bg-blue-700 hover:no-underline active:bg-blue-600 rounded-sm text-base`;

    return (
        <div className='bg-neutral-900 w-60 h-screen p-3 flex flex-col text-white'>
            <div className='w-full flex justify-end '>
            <TfiArrowCircleLeft onClick={handleSidebarToggle} className=' rounded-full text-white text-2xl cursor-pointer md:hidden'/>
            </div>
          <div className='flex items-center gap-2 px-2 py-3'>

            <span className='text-neutral-100 text-lg'><ApplicationLogo className='w-full h-full'/> </span>
          </div>
          <div className='flex-1 flex flex-col overflow-auto'>
            <div className='flex-1 py-8 flex flex-col gap-0.5 overflow-auto '>
              {/* Render sidebar links */}
              {DASHBOARD_SIDEBAR_LINKS.map((item) => {
                return (
                  <SidebarLink key={item.key} item={item} onClick={handleSidebarToggle}/>
                );
              })}
            </div>

            <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
              {/* Render bottom links */}
              {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => {
                return (
                  <SidebarLink key={item.key} item={item} onClick={handleSidebarToggle}/>
                );
              })}
              {/* Logout link */}
              <div className={classNames('text-red-500 cursor-pointer', linkClasses)} onClick={logout}>
                <span className='text-xl'><HiOutlineLogout /></span>
                Logout
              </div>
            </div>
          </div>
        </div>
      );
};

function SidebarLink({ item }) {
  const linkClasses = `flex items-center gap-2 font-light px-3 py-2 hover:bg-blue-700 hover:no-underline active:bg-blue-600 rounded-sm text-base`;
  const pathname = window.location.pathname;


  return (
    // Highlight the active link based on the current location
    <Link
      href={item.path}
      className={classNames(
        pathname === item.path ? `text-white bg-blue-700` : 'text-neutral-400',
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}
