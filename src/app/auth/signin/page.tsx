'use client'
import { useAlert } from "@/components/alert/Context";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Signup() {
  const session = useSession();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const alert = useAlert();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        alert.showAlert(
          {
            message: "Error: " + res.error,
            mode: "error"
          }
        )
      } else {
        alert.showAlert(
          {
            message: "Successfully signed in",
            mode: "success"
          }
        )
      }
    }
    );

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-primary">
      {session.data?.user?.email ? (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center w-1/2">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-center my-4">
              {session.data.user.email}
            </h1>
            <h2 className="text-black text-lg">
              is already signed in
            </h2>
          </div>
          <button
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
            className="w-full p-2 bg-primary text-white rounded-md mt-4"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-[30px] px-[50px] bg-white rounded-lg shadow-md w-[600px] h-[400px]" // Adjust width here
        >
          <div className="text-center text-black text-3xl font-semibold mb-6 mt-4">
            LOGIN
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-black">
              Email Address
            </label>
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
            <label htmlFor="password" className="block mb-2  text-black">
              Password
            </label>
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
          <button
            type="submit"
            className="w-full p-2 text-white rounded-md  bg-primary mt-4"
          >
            Sign In
          </button>
        </form>
      )}
    </div>
  );
}
