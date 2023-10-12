import { Menu, Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment } from 'react';
import { useStateContext } from '../../contents/ContextProvider';
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from '@mui/material';
import { inputCss } from '../css-components/text-field';
import { BiUserCircle } from 'react-icons/bi';
import { Link, router } from '@inertiajs/react';
import { HiOutlineViewGrid } from 'react-icons/hi';

export const Header = ({ logout, currentUser, onSidebarToggle }) => {
  const { setSearchQuery, searchQuery } = useStateContext();
  const [inputValue, setInputValue] = React.useState(searchQuery);

  // Function to handle user search
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(e.target.value); // Update the search query state on Enter key press
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value state
  };

  return (
    <div className='bg-white h-[64px]  mt-5 px-4 flex flex-row items-center border-1 border-gray-200 justify-between w-screen md:w-full'>
      <div className='flex space-x-3 items-center md:hidden'>
        {/* Sidebar Toggle Button */}
        <button
          onClick={onSidebarToggle}
          className="text-slate-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
        >
          <HiOutlineViewGrid className="w-[3rem] h-[3rem] " />
        </button>
        {/* Search Input */}
        <div>
        <TextField
            label="Search"
            value={inputValue} // Use inputValue state to set the TextField value
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onKeyUp={handleSearch} // Call handleSearch on key up event
            onChange={handleInputChange} // Call handleInputChange on input change
            sx={inputCss}
          />
        </div>
      </div>
      <div className=' hidden md:block'>
        {/* Search Input */}
        <div>
        <TextField
            label="Search"
            value={inputValue} // Use inputValue state to set the TextField value
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onKeyUp={handleSearch} // Call handleSearch on key up event
            onChange={handleInputChange} // Call handleInputChange on input change
            sx={inputCss}
          />
        </div>
      </div>

      {/* Icons and Menu */}
      <div className='flex items-center gap-2 mx-3'>
        {/* User Menu */}
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='ml-2 inline-flex rounded-full focus:outline-none'>
              <div className='flex flex-col items-center space-y-3'>
                <BiUserCircle className='h-10 w-10 text-slate-500' />
                <p className='text-sm text-green-600'>
                  {currentUser?.school_phone}
                  {currentUser?.phone_number}
                </p>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='px-1 py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active && 'bg-gray-100',
                        'text-gray-700 focus:bg-gray-200 block cursor-pointer rounded-sm px-4 py-2'
                      )}
                      onClick={() => {
                        router.visit('/');
                      }}
                    >
                      Settings
                    </div>
                  )}
                </Menu.Item>
                {currentUser.school_phone && currentUser.school_email ? (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={classNames(
                          active && 'bg-gray-100',
                          'text-gray-700 focus:bg-gray-200 block cursor-pointer rounded-sm px-4 py-2'
                        )}
                        href='/school/profile'
                      >
                        School Profile
                      </Link>
                    )}
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={classNames(
                          active && 'bg-gray-100',
                          'text-gray-700 focus:bg-gray-200 block cursor-pointer rounded-sm px-4 py-2'
                        )}
                        href='/user/profile'
                      >
                        User Profile
                      </Link>
                    )}
                  </Menu.Item>
                )}

                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active && 'bg-gray-100',
                        'text-gray-700 focus:bg-gray-200 block cursor-pointer rounded-sm px-4 py-2'
                      )}
                      onClick={logout}
                    >
                      Logout
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
