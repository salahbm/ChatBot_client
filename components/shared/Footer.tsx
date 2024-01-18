import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="shadow bg-amber-400  w-full ">
      <div className="w-full  p-2 ">
        <div className="sm:flex sm:items-center sm:justify-between p-1">
          <Link href="/" className="flex items-center mb-2 sm:mb-0 ">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              ChatBot
            </span>
          </Link>
          <ul className="flex flex-wrap items-center md:mb-6  mb-1 text-sm font-medium text-white sm:mb-0 dark:text-white">
            <li>
              <Link href="/about" className="hover:underline me-4 ">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 ">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className=" my-1 border-white sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white sm:text-center dark:text-white">
          © 2024{' '}
          <Link href="/" className="hover:underline">
            ChatBot™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
