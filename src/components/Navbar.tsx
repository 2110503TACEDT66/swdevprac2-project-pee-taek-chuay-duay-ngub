"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const session = useSession();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
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
        <div className="md:hidden absolute top-[5rem] right-[1rem] mt-2 bg-white shadow-lg rounded-md py-2 w-[15rem]">
          <button className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left">
            Explore
          </button>
          <button className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left">
            Login
          </button>
          <button className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left">
            Register
          </button>
        </div>
      )}

      {session.data?.user?.name ? (
        <div>{session.data?.user?.name}</div>
      ) : (
        <div className="hidden md:flex grow items-center justify-between font-semibold gap-[2rem]">
          <button className="grow text-[26px] font-semibold text-start">
            <Link href={"#"}>Explore</Link>
          </button>
          <button type="button" className="text-[26px] flex-none">
            <Link href={"/auth/signin"}>Login</Link>
          </button>
          <button
            type="button"
            className="bg-primary text-white px-[1rem] text-[26px] rounded-[10px] h-[55px] border-2 border-transparent hover:bg-cutoff-white hover:border-primary hover:text-primary flex-none"
          >
            <Link href={"/auth/signup"}>Register</Link>
          </button>
        </div>
      )}
    </div>
  );
}
