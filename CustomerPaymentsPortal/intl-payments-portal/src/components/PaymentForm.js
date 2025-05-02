import React, { useState } from 'react';
import api from '../services/api';

const PaymentForm = () => {
    const [form, setForm] = useState({
        amount: '',
        currency: 'ZAR',
        provider: 'SWIFT',
        payeeAccountNumber: '',
        swiftCode: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateInputs = () => {
        const amountRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
        const accRegex = /^\d{10}$/;
        const swiftRegex = /^[A-Z0-9]{8,11}$/i;

        return (
            amountRegex.test(form.amount) &&
            accRegex.test(form.payeeAccountNumber) &&
            swiftRegex.test(form.swiftCode)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
            setMessage('Please fill in all fields correctly.');
            return;
        }

        try {
            const res = await api.post('/customer/payment', form);
            setMessage('✅ Payment submitted successfully.');
        } catch (err) {
            setMessage(err.response?.data || '❌ Payment failed.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Make an International Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="number" name="amount" step="0.01" placeholder="Amount"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={handleChange} required />

                <select name="currency" className="w-full px-4 py-2 border rounded-lg" onChange={handleChange}>
                    <option value="ZAR">ZAR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                </select>

                <select name="provider" className="w-full px-4 py-2 border rounded-lg" onChange={handleChange}>
                    <option value="SWIFT">SWIFT</option>
                </select>

                <input type="text" name="payeeAccountNumber" placeholder="Payee Account Number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    onChange={handleChange} required />

                <input type="text" name="swiftCode" placeholder="SWIFT Code"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    onChange={handleChange} required />

                <button type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Pay Now
                </button>
            </form>

            {message && (
                <div className="mt-4 p-3 text-sm rounded-lg bg-gray-100 text-gray-700">{message}</div>
            )}
        </div>
    );
};

export default PaymentForm;
