'use client';

import React, { useState } from 'react';

const RegisterPage = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordAgainChange = (event) => {
    setPasswordAgain(event.target.value);
  };

  const handleSignUp = () => {
    if (!email || !username || !password || !passwordAgain) {
      setRegistrationError('Minden mező kitöltése kötelező.');
      return;
    }

    if (password !== passwordAgain) {
      setRegistrationError('A jelszavak nem egyeznek.');
      return;
    }

    const userData = {
      name: username,
      email: email,
      password: password,
    };

    const objectString = JSON.stringify(userData);
    localStorage.setItem('userData_' + username, objectString);
    console.log('Felhasználói adatok elmentve a localStorage-ba:', userData);
    registerUser(username, password, email);
    onSignIn();
  };

  async function registerUser(username, password, email) {
    const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
        const user = await response.json();
        console.log('User registered successfully:', user);
        return user;
    } else {
        const errorData = await response.json();
        console.error('Failed to register user:', response.status, errorData);
        throw new Error('Registration failed');
    }
}

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
              <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 text-black " value={email} onChange={handleEmailChange} />
            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm">Username</label>
              <input type="text" name="username" id="username" placeholder="leroyjenkins" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 text-black " value={username} onChange={handleUsernameChange} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password</label>
              </div>
              <input type="password" name="password" id="password" placeholder="******" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 text-black " value={password} onChange={handlePasswordChange} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="passwordAgain" className="text-sm">Password again</label>
                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline hidden">Passwords don't match!</a>
              </div>
              <input type="password" name="passwordAgain" id="passwordAgain" placeholder="******" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 text-black " value={passwordAgain} onChange={handlePasswordAgainChange} />
            </div>
            {registrationError && <p className="text-red-500 text-sm">{registrationError}</p>}
          </div>
          <div className="space-y-2">
            <div className='w-full flex justify-center'>
              <button type="button" className="px-8 py-3 font-semibold rounded-md dark:bg-gray-50 dark:text-[#000000b9] transition-all duration-300 active:scale-75" onClick={handleSignUp}>Sign up</button>
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