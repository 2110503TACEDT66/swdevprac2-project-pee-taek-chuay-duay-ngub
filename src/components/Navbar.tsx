"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const session = useSession();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      } else {
        setProfileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-between bg-cutoff-white text-black fixed w-full h-[105px] z-20 top-0 border-2 border-gray-300 px-[2rem] gap-[2rem]">
      <div className="flex flex-none items-center">
        <Image
          src="/images/cedt-logo.png"
          width={120}
          height={45}
          alt="CEDT Logo"
        />
        <div className="text-[42px] font-semibold select-none">
          JOB<span className="text-[#A11F2C]">F</span>AIR
        </div>
      </div>

      <button
        onClick={toggleMenu}
        className="md:hidden hover:bg-zinc-200 p-[10px] rounded-[10px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      {menuOpen && (
        <div className="absolute top-[5rem] right-[1rem] mt-2 bg-white shadow-lg rounded-md py-2 w-[15rem]">
          <Link
            href={"/"}
            className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left"
          >
            Explore
          </Link>
          {session.data?.user ? (
            <div>
              <Link
                href={"#"}
                className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Profile
              </Link>
              <Link
                href={"#"}
                className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Sign Out
              </Link>
            </div>
          ) : (
            <div>
              <Link
                href={"/auth/signin"}
                className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Login
              </Link>
              <Link
                href={"/auth/signup"}
                className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}

      {session.data?.user?.name ? (
        <div className="hidden md:flex grow items-center justify-between font-semibold gap-[2rem]">
          <Link
            href={"/"}
            className="grow text-[26px] font-semibold text-start hover:drop-shadow-lg"
          >
            Explore
          </Link>
          <button
            onClick={toggleProfileMenu}
            className="flex justify-center items-center gap-[1rem] hover:drop-shadow-lg p-[10px] rounded-[10px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-2 -2 24 24"
              width="50"
              fill="currentColor"
            >
              <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-14a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V8a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V8a2 2 0 0 0-2-2zM5.91 16.876a8.033 8.033 0 0 1-1.58-1.232 5.57 5.57 0 0 1 2.204-1.574 1 1 0 1 1 .733 1.86c-.532.21-.993.538-1.358.946zm8.144.022a3.652 3.652 0 0 0-1.41-.964 1 1 0 1 1 .712-1.868 5.65 5.65 0 0 1 2.284 1.607 8.032 8.032 0 0 1-1.586 1.225z"></path>
            </svg>
            <div className="flex flex-col justify-center items-start">
              <div className="text-xl">{session.data.user.name}</div>
              <div className="text-sm text-gray-600">Job seeker</div>
            </div>
          </button>
          {profileMenuOpen && (
            <div className="absolute top-[5rem] right-[1rem] mt-2 bg-white shadow-lg font-normal rounded-md py-2 w-[15rem]">
              <Link
                href={"/auth/signin"}
                className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Profile
              </Link>
              <Link
                href={"#"}
                className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left"
              >
                Sign Out
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden md:flex grow items-center justify-between font-semibold gap-[2rem]">
          <Link
            href={"/"}
            className="grow text-[26px] font-semibold text-start hover:drop-shadow-lg"
          >
            Explore
          </Link>
          <Link
            href={"/auth/signin"}
            className="text-[26px] flex-none hover:drop-shadow-lg"
          >
            Login
          </Link>
          <Link
            href={"/auth/signup"}
            className="flex items-center justify-center bg-primary text-white px-[1rem] text-[26px] rounded-[10px] h-[55px] border-2 border-transparent hover:bg-cutoff-white hover:border-primary hover:text-primary flex-none"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
