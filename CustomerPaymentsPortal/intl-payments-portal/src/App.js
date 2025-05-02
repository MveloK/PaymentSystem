import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import PaymentForm from './components/PaymentForm';
import Navbar from './components/Navbar'; // Import the Navbar

function App() {
    return (
        <Router>
            <div className="bg-gray-100 min-h-screen">
                <Navbar /> {/*Add the Navbar at the top */}
                <div className="pt-6 px-4">
                    <Routes>
                        <Route path="/" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/payment" element={<PaymentForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
