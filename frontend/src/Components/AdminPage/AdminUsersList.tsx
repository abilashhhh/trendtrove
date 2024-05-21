import React, { useEffect, useState } from 'react';
import { getAllUsersForAdmin } from '../../API/Admin/admin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminHomePageContent() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await getAllUsersForAdmin();
                setUsers(allUsers.users);
            } catch (error) {
                toast.error("Failed to load users");
                console.error("Failed to fetch users", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar flex flex-col">
            <h1 className="text-center text-xl font-semibold mb-4">Users List</h1>
            <div className="overflow-x-auto">
                <table className="w-full mt-4 border-collapse">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="p-2 text-left">Profile</th>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Username</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Bio</th>
                            <th className="p-2 text-left">Private </th>
                            <th className="p-2 text-left">Suspended </th>
                            <th className="p-2 text-left">Blocked</th>
                            <th className="p-2 text-left">Google Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b hover:bg-gray-200 dark:hover:bg-gray-700">
                                <td className="p-2 flex items-center">
                                    <img src={user.dp} alt={`${user.name}'s profile`} className="w-10 h-10 rounded-full mr-2"/>
                                    <span>{user.name}</span>
                                </td>
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.username}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">{user.bio || 'N/A'}</td>
                                <td className="p-2">{user.isPrivate ? 'Yes' : 'No'}</td>
                                <td className="p-2">{user.isSuspended ? 'Yes' : 'No'}</td>
                                <td className="p-2">{user.isBlocked ? 'Yes' : 'No'}</td>
                                <td className="p-2">{user.isGoogleSignedIn ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminHomePageContent;