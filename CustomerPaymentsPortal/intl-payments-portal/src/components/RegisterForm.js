import React, { useState } from 'react';
import api from '../services/api';

const Register = () => {
    const [form, setForm] = useState({
        fullName: '',
        idNumber: '',
        accountNumber: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const nameRegex = /^[A-Za-z\s]{2,50}$/;
        const idRegex = /^\d{13}$/;
        const accRegex = /^\d{10}$/;
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        return (
            nameRegex.test(form.fullName) &&
            idRegex.test(form.idNumber) &&
            accRegex.test(form.accountNumber) &&
            passRegex.test(form.password)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            setMessage("❌ Invalid input. Please check your details.");
            return;
        }

        try {
            await api.post('/customer/register', form);
            setMessage("✅ Registration successful!");
        } catch (err) {
            setMessage(err.response?.data || "❌ Registration failed.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="fullName" placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} required />

                <input name="idNumber" placeholder="ID Number"
                    className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} required />

                <input name="accountNumber" placeholder="Account Number"
                    className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} required />

                <input name="password" type="password" placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg" onChange={handleChange} required />

                <button type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
                    Register
                </button>
            </form>

            {message && <div className="mt-4 p-3 text-sm bg-gray-100 rounded-lg">{message}</div>}
        </div>
    );
};

export default Register;
