"use client";
import { useState, useEffect } from "react";
import { getEmail } from "@/app/api/apiCalls"; 

function ProfileSettings() {

    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const username = typeof window !== 'undefined' ? localStorage.getItem('loggedInUsername') : null;


    useEffect(() => {
        async function fetchEmailData() {
            if (!username) {
                setLoading(false);
                return;
            }
            
            try {
                const userEmail = await getEmail(username);
                setEmail(userEmail);
            } catch (error) {
                console.error("Failed to fetch email:", error);
                setEmail(null);
            } finally {
                setLoading(false);
            }
        }

        fetchEmailData();
    }, [username]);


    const handleSaveProfile = () => {
        // Logic for saving profile (e.g., updating username/email if editable)
        alert(`Attempting to save profile for: ${username} with email: ${email}`);
    };

    const handlePasswordUpdate = () => {
        // Logic for updating password
        if (newPassword !== newPassword2) {
            alert("New passwords do not match!");
            return;
        }
        alert(`Attempting to update password using current: ${currentPassword} and new: ${newPassword}`);
        // API call to update password would go here
    };


    if (loading) {
        return <div className="p-4 text-center dark:text-gray-300">Loading profile data...</div>;
    }

    if (!username) {
        return <div className="p-4 text-center text-red-500">You must be logged in to view settings.</div>;
    }

    return (
        <div className="p-4 space-y-6 overflow-hidden">
            <h3 className="text-2xl font-bold border-b pb-2 dark:border-gray-700">Profile details</h3>
            

            <div className="flex flex-col">
                <label htmlFor="username" className="text-sm font-medium mb-1 dark:text-gray-400">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    defaultValue={username}
                    disabled
                    className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:outline-none transition duration-150 cursor-not-allowed bg-gray-50"
                />
            </div>
            

            <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium mb-1 dark:text-gray-400">E-mail</label>
                <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    defaultValue={email || 'Email not found'}
                    className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-gray-50"
                />
            </div>

            <div className="pt-6 border-t dark:border-gray-700/50">
                <h4 className="text-xl font-semibold mb-4">Change Password</h4>
                
                <div className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-white"
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-white"
                    />
                    <input
                        type="password"
                        placeholder="New Password Again"
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.target.value)}
                        className="p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 bg-white"
                    />
                </div>
            </div>

            <div className="flex justify-between items-center border-t pt-4 dark:border-gray-700">
                <button 
                    onClick={handlePasswordUpdate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700 transition duration-150"
                >
                    Update Password
                </button>
                <button 
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
                >
                    Save Profile
                </button>
            </div>
            <div className="border-t pt-4 dark:border-gray-700">
                <h4 className="text-xl font-semibold mb-4">Danger Zone</h4>
                <div className="flex justify-between items-center">
                    <p className="font-bold">
                        If you delete your profile, 
                        it will delete all your future events.<br/>
                        Are you sure you want this?
                    </p>
                    <button 
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
                    >
                        Delete Profile
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default ProfileSettings;