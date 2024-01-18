import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="shadow bg-amber-400  w-full fixed bottom-0">
      <div className="w-full mx-auto p-4 ">
        <div className="sm:flex sm:items-center sm:justify-between p-1">
          <Link
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              ChatBot
            </span>
          </Link>
          <ul className="flex flex-wrap items-center md:mb-6  mb-1 text-sm font-medium text-white sm:mb-0 dark:text-white">
            <li>
              <Link href="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="md:my-6 my-1 border-white sm:mx-auto dark:border-gray-700 lg:my-8" />
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
