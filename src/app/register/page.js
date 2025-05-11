'use client';

import React from 'react';

const RegisterPage = ({ onSignIn }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className='w-[25%] content-center p-6 rounded-xl sm:p-10 dark:bg-[#000000b9] bg-[#ffffffb9] shadow-2xl backdrop-blur-md'>
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign up</h1>
          <p className="text-sm ">Sign up to create an account</p>
        </div>
        <form noValidate="" action="" className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
              <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 " />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password</label>
              </div>
              <input type="password" name="password" id="password" placeholder="******" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 " />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password again</label>
                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline hidden">Passwords don't match!</a>
              </div>
              <input type="password" name="password" id="password" placeholder="******" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 " />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button type="button" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-default-600 dark:text-gray-50">Sign up</button>
            </div>
            <p className="px-6 text-sm text-center ">
              Already registered?{' '}
              <button className="hover:underline font-bold dark:text-default-600" onClick={onSignIn}>Sign in</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;