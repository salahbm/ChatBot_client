import React from 'react';

const NewsView = () => {
  return (
    <section className="flex items-center bg-orange-100 font-poppins py-2 ">
      <div className="justify-center flex-1 mx-auto max-w-7xl ">
        <div className="px-4 py-4 mx-4 bg-orange-50 rounded-md shadow md:p-10 dark:bg-gray-900">
          <div className="flex flex-wrap items-center ">
            <div className="w-full px-4 mb-8 lg:w-1/2 lg:mb-0">
              <h2 className="mb-4 text-4xl text-neutral-700 text-center lg:text-left dark:text-gray-300">
                Sign up for our newsletter
              </h2>
              <p className="text-base leading-loose text-center text-gray-500 lg:text-left lg:max-w-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor labore et dolore magna aliqua.
              </p>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="flex items-center justify-center lg:justify-end">
                <form action="">
                  <input
                    className="w-full px-4 py-2 mb-4 mr-2 leading-loose text-center bg-white border border-gray-300 lg:mb-0 lg:text-left lg:w-auto rounded-xl dark:border-gray-800 dark:text-gray-400 dark:bg-gray-800"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className="inline-block w-full px-6 py-2 mb-2 font-bold leading-loose text-white transition duration-200 bg-orange-500 lg:w-auto hover:bg-orange-700 rounded-l-xl rounded-t-xl">
                    Notify me
                  </button>
                  <p className="text-sm leading-loose text-center text-gray-500 lg:text-left lg:max-w-lg">
                    We protect your data with care. Read our{' '}
                    <a
                      href="#"
                      className="text-orange-400 underline hover:text-orange-700 "
                    >
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsView;
