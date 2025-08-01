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

  

    registerUser(username, password, email);
    onSignIn();
  };

  async function registerUser(username, password, email) {
    try {
        const response = await fetch('http://localhost:8080/api/auth/register', { // <--- Az ÚJ URL!
            method: 'POST', // POST metódus
            headers: {
                'Content-Type': 'application/json', // Fontos: JSON formátumot küldünk
            },
            body: JSON.stringify({ // Az adatokat JSON formátumban küldjük
                username: username,
                password: password,
                email: email
            }),
        });

        if (response.ok) { // HTTP státusz 200-299 között van (pl. 201 Created)
            const newUser = await response.json(); // A backend által visszaadott felhasználói adatok
            console.log('Sikeres regisztráció:', newUser);
            alert('Sikeres regisztráció! Most már bejelentkezhetsz.'); // Egyszerű visszajelzés
            return newUser;
        } else {
            // Hiba történt, például ha a felhasználónév már foglalt
            const errorData = await response.json(); // Feltételezve, hogy a backend hibát is JSON-ban küld
            let errorMessage = 'Regisztráció sikertelen.';
            if (errorData && errorData.message) {
                errorMessage = errorData.message; // Ha a backend küld egy hibaüzenet mezőt
            } else if (response.status === 400) {
                errorMessage = 'Hibás adatok a regisztrációhoz (pl. már foglalt felhasználónév).';
            } else if (response.status === 500) {
                errorMessage = 'Szerveroldali hiba történt a regisztráció során.';
            }

            console.error('Regisztráció sikertelen:', response.status, errorData);
            alert('Hiba a regisztráció során: ' + errorMessage); // Hibaüzenet megjelenítése
            throw new Error(errorMessage);
        }
    } catch (error) {
        // Hálózati hiba vagy egyéb nem HTTP válasz hiba
        console.error('Hálózati hiba a regisztráció során:', error);
        alert('Hálózati hiba: Nem sikerült kommunikálni a szerverrel.');
        throw error;
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
              <input type="email" name="email" id="email" placeholder="your@email.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 text-black " value={email} onChange={handleEmailChange} />
            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm">Username</label>
              <input type="text" name="username" id="username" placeholder="your username" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 text-black " value={username} onChange={handleUsernameChange} />
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