// src/pages/MyAccountPage.tsx

import { useState } from 'react';

const MyAccountPage = () => {
    type View = 'dashboard' | 'orders' | 'account-details' | 'logout';
    const [activeView, setActiveView] = useState<View>('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return (
                    <div>
                        <h3 className="mb-4 text-2xl font-semibold">Dashboard</h3>
                        <p>Hello, **User** (not **User**? <button className="text-primary hover:underline">Log out</button>)</p>
                        <p className="mt-4">From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                    </div>
                );
            case 'orders':
                return (
                     <div>
                        <h3 className="mb-4 text-2xl font-semibold">Orders</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border">Order</th>
                                        <th className="px-4 py-2 border">Date</th>
                                        <th className="px-4 py-2 border">Status</th>
                                        <th className="px-4 py-2 border">Total</th>
                                        <th className="px-4 py-2 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border">#1357</td>
                                        <td className="px-4 py-2 border">March 15, 2025</td>
                                        <td className="px-4 py-2 border">Completed</td>
                                        <td className="px-4 py-2 border">$165.00 for 2 items</td>
                                        <td className="px-4 py-2 border"><button className="text-primary hover:underline">View</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'account-details':
                 return (
                    <div>
                        <h3 className="mb-4 text-2xl font-semibold">Account Details</h3>
                        <form className="space-y-4">
                             <div>
                                <label className="block mb-1">First Name</label>
                                <input type="text" className="w-full p-2 border rounded-md" defaultValue="User" />
                            </div>
                            <div>
                                <label className="block mb-1">Last Name</label>
                                <input type="text" className="w-full p-2 border rounded-md" defaultValue="Name" />
                            </div>
                             <div>
                                <label className="block mb-1">Email Address</label>
                                <input type="email" className="w-full p-2 border rounded-md" defaultValue="user@example.com" />
                            </div>
                            <button type="submit" className="px-6 py-2 font-semibold text-white rounded-md bg-primary hover:opacity-90">Save Changes</button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="container px-4 py-20 mx-auto">
             <h1 className="mb-12 text-4xl font-bold text-center">My Account</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {/* Sidebar Navigation */}
                <div className="md:col-span-1">
                    <ul className="space-y-2">
                        <li><button onClick={() => setActiveView('dashboard')} className={`w-full text-left p-3 rounded-md transition-colors ${activeView === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>Dashboard</button></li>
                        <li><button onClick={() => setActiveView('orders')} className={`w-full text-left p-3 rounded-md transition-colors ${activeView === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>Orders</button></li>
                        <li><button onClick={() => setActiveView('account-details')} className={`w-full text-left p-3 rounded-md transition-colors ${activeView === 'account-details' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>Account Details</button></li>
                        <li><button className="w-full p-3 text-left rounded-md hover:bg-gray-100">Logout</button></li>
                    </ul>
                </div>

                {/* Content */}
                <div className="md:col-span-3">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MyAccountPage;