import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        accountNumber: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const accRegex = /^\d{10}$/;
        const passRegex = /^.{6,}$/;

        return accRegex.test(form.accountNumber) && passRegex.test(form.password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            setMessage("❌ Invalid login credentials.");
            return;
        }

        try {
            const res = await api.post('/customer/login', form);
            localStorage.setItem('token', res.data.token);
            setMessage("✅ Login successful!");
            setTimeout(() => navigate('/payment'), 1000);
        } catch (err) {
            setMessage(err.response?.data || "❌ Login failed.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="accountNumber" placeholder="Account Number"
                    className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} required />

                <input name="password" type="password" placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} required />

                <button type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Log In
                </button>
            </form>

            {message && <div className="mt-4 p-3 text-sm bg-gray-100 rounded-lg">{message}</div>}
        </div>
    );
};

export default Login;
