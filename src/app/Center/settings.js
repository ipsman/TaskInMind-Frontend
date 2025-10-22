'use client'

import { useState } from 'react';
import ProfileSettings from './elements/profileSettings';


const Notifications = () => (
    <div className="p-4">
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-700">Notifications</h3>
        <p className="dark:text-gray-400">E-mail notification setting...</p>
        <div className="mt-4">
             <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                <span className="text-gray-700 dark:text-gray-300">Reminders sending in E-mail</span>
            </label>
        </div>
    </div>
);

function Settings() {
    const [activeTab, setActiveTab] = useState('Profile settings');

    const cancelSettings = () => {
        document.getElementById("settings").style.transform = "translateY(2000px)";
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile settings':
                return <ProfileSettings />;
            case 'Notifications':
                return <Notifications />;
            default:
                return <ProfileSettings />;
        }
    };

    const navItems = [
        { name: 'Profile settings' },
        { name: 'Notifications' }
    ];
    
    const getButtonClass = (tabName) => {
        return `p-3 text-left rounded-xl transition-colors duration-150 flex items-center gap-3 ${
            activeTab === tabName 
                ? 'bg-[#2e2e2ec0] text-white shadow-lg font-bold' 
                : 'hover:bg-gray-700/50 dark:hover:bg-gray-800 text-gray-400'
        }`;
    };

    return (
        <div className="w-full h-full absolute flex justify-center items-center duration-300 translate-y-[1900px] z-50" id="settings">
            <div className="relative w-[95%] max-w-5xl h-[90%] md:h-[90%] shadow-md rounded-lg m-1 p-1 dark:bg-[#000000b9] bg-[#ffffffb9] text-gray-300 overflow-hidden border backdrop-blur-md">
                <header className="flex px-2 justify-between items-center">
                    <h2 className="text-2xl text-white">Settings</h2>
                    <button className="hover:text-white transition-colors" onClick={cancelSettings}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] h-[calc(100%-80px)]">
                    <nav className="p-2 border-r border-gray-700/50 dark:bg-[#000000c0] hidden md:flex flex-col gap-2">
                        {navItems.map((item) => (
                            <button 
                                key={item.name} 
                                className={getButtonClass(item.name)} 
                                onClick={() => setActiveTab(item.name)}
                            >
                                <span className="text-lg">{item.name}</span>
                            </button>
                        ))}
                    </nav>
                    <main className="p-6 overflow-y-hidden">
                        {renderContent()}
                    </main>

                </div>
            </div>
        </div>
    );
}

export default Settings;