"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Signup() {
  const session = useSession();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-primary">
      {session.data?.user?.email ? (
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center my-4">
            {session.data.user.email} is already signed in
          </h1>
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded-lg shadow-md"
        >
          <div className="text-center text-black text-[25px] font-semibold">
            LOG IN
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email Address
            </label>
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
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
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
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      )}
    </div>
  );
}

