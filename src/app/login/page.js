'use client';

import React, { useState } from 'react';

const LoginPage = ({ onSignUp, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleEmailChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    // const storedUsers = {};
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i);
    //   if (key && key.startsWith('userData_')) {
    //     try {
    //       const userString = localStorage.getItem(key);
    //       if (userString) {
    //         const user = JSON.parse(userString);
    //         storedUsers[user.email] = user;
    //         console.log(user);
    //       }
    //     } catch (error) {
    //       console.error('Hiba a felhasználói adatok olvasása közben:', error);
    //     }
    //   }
    // }

    // if (storedUsers[email] && storedUsers[email].password === password) {
    //   localStorage.setItem('authToken', 'valami_token');
    //   localStorage.setItem('loggedInUsername', storedUsers[email].name);
    //   onLoginSuccess();
    // } else {
    //   setLoginError('Hibás e-mail cím vagy jelszó.');
    // }

    loginUser(username, password)
  };

  async function loginUser(username, password) {
    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const token = await response.text();
            console.log('Login successful. Token:', token);
            localStorage.setItem('authToken', token); 
            localStorage.setItem('loggedInUsername', username);
            onLoginSuccess(); 
            return token;
        } else {
            const errorText = await response.text();
            console.error('Login failed:', response.status, errorText);

            throw new Error(errorText || 'Bejelentkezés sikertelen.');
        }
    } catch (error) {
        console.error('Network or other error during login:', error);
        throw error;
    }
}

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className='w-[25%] content-center p-6 rounded-xl sm:p-10 dark:bg-[#000000b9] bg-[#ffffffb9] shadow-2xl backdrop-blur-md'>
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm ">Sign in to access your account</p>
        </div>
        <form noValidate="" action="" className="space-y-12">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 text-black "
                value={username}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password</label>
                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline ">Forgot password?</a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 text-black"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          </div>
          <div className="space-y-2 flex flex-col justify-center">
            <div className='w-full flex justify-center'>
              <button
                type="button"
                className="px-8 py-3 font-semibold rounded-md dark:bg-gray-50 dark:text-[#000000b9] transition-all duration-300 active:scale-75"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
            <p className="px-6 text-sm text-center ">
              Don't have an account yet?{' '}
              <button className="hover:underline font-bold dark:text-default-600" onClick={onSignUp}>Sign up</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;