import React, { useState } from 'react';
import './App.css'; // Import your CSS file
import InterestModal from './InterestModal'; 



function Register() {
    // State variables to manage form inputs and selected categories
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [country, setCountry] = useState('');
    const [showInterestModal, setShowInterestModal] = useState(false); 

    const onSave = (userData) => {
        console.log('User data:', userData);
      };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Data validation
        if (
            username === '' ||
            email === '' ||
            phone === '' ||
            password === '' ||
            confirmPassword === '' ||
            country === ''
        ) {
            alert('Please fill in all fields.');
        } else if (password !== confirmPassword) {
            alert('The password does not match');
        } else {
            // If data is valid, open the interest modal
            setShowInterestModal(true);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="text-3xl block text-center font-semibold"><i className="fa-solid fa-user"></i> Register</h1>
                <hr className="mt-3" />
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label htmlFor="username" className="block text-base mb-2">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter Username..." />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="email" className="block text-base mb-2">Email</label>
                        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter email..." />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="phone" className="block text-base mb-2">Phone</label>
                        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter phone..." />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password" className="block text-base mb-2">Password</label>
                        <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter password..." />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="confirmPassword" className="block text-base mb-2">Confirm Password</label>
                        <input type="text" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" placeholder="Enter confirm Password ..." />
                    </div>
                    <div className="mt-3">
                        <label htmlFor="country" className="block text-base mb-2">Country</label>
                        <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600">
                            <option value="" disabled>Select your country</option>
                            <option value="usa">United States</option>
                            <option value="canada">Canada</option>
                            <option value="uk">United Kingdom</option>
                            {/* Add more countries as needed */}
                        </select>
                    </div>
                    <div className="mt-5">
                        <button type="submit" className="border-2 border-bg-gray-800 bg-gray-800 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-gray-800 font-semibold"><i className="fa-solid fa-right-to-bracket" ></i>&nbsp;&nbsp;Register</button>
                    </div>
                </form>
            </div>
            {showInterestModal && <InterestModal onSave={onSave} userData={{ username, email, phone, country }} />}
        </div>
    );
}

export default Register;
