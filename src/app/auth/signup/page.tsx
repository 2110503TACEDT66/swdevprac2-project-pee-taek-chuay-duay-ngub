'use client'
import { useAlert } from '@/components/alert/Context';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        Firstname: '',
        Lastname: '',
        telephoneNumber: '',
        password: '',
        confirmPassword: '', // Added confirmPassword field
    });
    const alert = useAlert();

    const { email, Firstname, Lastname, telephoneNumber, password, confirmPassword } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password != confirmPassword) {
            alert.showAlert(
                {
                    message: 'Password and Confirm Password do not match',
                    mode: 'error'
                }
            );
        } else {
            e.preventDefault();
            // Implement your signup logic here
            fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    name: Firstname + " " + Lastname,
                    telephoneNumber: telephoneNumber,
                    password: password
                }),
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then((data) => {
                    throw new Error(data.message || 'Something went wrong');
                });
            }).catch((error) => {
                alert.showAlert({
                    message: "Failed to register user. It's either the email already exists or something went wrong.",
                    mode: 'error'
                });
            }
            );
            console.log('Form Data:', {
                email: email,
                name: Firstname + " " + Lastname,
                telephoneNumber: telephoneNumber,
                password: password
            });
            // do signin
            const result = signIn('credentials', {
                email: email,
                password: password,
                redirect: false,
            }).then((result) => {
                if (!result?.ok) {
                    return
                } else {
                    window.location.href = '/explore';
                }
            });
        }

    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 text-primary">
            <form onSubmit={handleSubmit} className="p-[30px] px-[50px] bg-white rounded-lg shadow-md w-[600px] h-[600px] ">
                <div className="text-center text-black text-3xl font-semibold mb-6 mt-4">
                    REGISTER
                </div>
                <div className="flex mb-4">
                    <div className="w-1/2 mr-2">
                        <label htmlFor="Firstname" className="block mb-2 text-black">Firstname</label>
                        <input
                            type="text"
                            name="Firstname"
                            id="Firstname"
                            value={Firstname}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                    <div className="w-1/2 ml-2">
                        <label htmlFor="Lastname" className="block mb-2 text-black">Lastname</label>
                        <input
                            type="text"
                            name="Lastname"
                            id="Lastname"
                            value={Lastname}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                </div>
                <div className="flex mb-4">
                    <div className="w-1/2 mr-2">
                        <label htmlFor="password" className="block mb-2 text-black">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                    <div className="w-1/2 ml-2">
                        <label htmlFor="confirmPassword" className="block mb-2 text-black">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md text-black"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-black">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="telephoneNumber" className="block mb-2 text-black">Telephone</label>
                    <input
                        type="tel"
                        name="telephoneNumber"
                        id="telephoneNumber"
                        value={telephoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                </div>
                <button type="submit" className="w-full p-2 text-white rounded-md bg-primary mt-4">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
