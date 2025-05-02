import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-semibold">International Payments</h1>
                <div className="space-x-4">
                    <Link to="/register" className="hover:text-green-400 transition duration-300">Register</Link>
                    <Link to="/login" className="hover:text-blue-400 transition duration-300">Login</Link>
                    <Link to="/payment" className="hover:text-yellow-400 transition duration-300">Payment</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
