"use client";
import { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        telephoneNumber: '',
        password: '',
    });

    const { email, name, telephoneNumber, password } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement your signup logic here
        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        console.log('Form Data:', formData);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 text-primary">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="telephoneNumber" className="block mb-2">Telephone</label>
                    <input
                        type="tel"
                        name="telephoneNumber"
                        id="telephoneNumber"
                        value={telephoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
        </div>
    );
}