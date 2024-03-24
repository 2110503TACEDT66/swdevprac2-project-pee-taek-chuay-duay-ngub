"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DropdownSelector from "./DropdownSelector";
import NavBarProfileCard from "./NavBarProfileCard";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const session = useSession();

  const dropDownItems1 = [
    { text: "Explore", url: "/" },
    { text: "Sign In", url: "/auth/signin" },
    { text: "Register", url: "/auth/signup" },
  ];

  const dropDownItems2 = [
    { text: "Profile", url: "#" },
    { text: "Sign Out", url: "#" },
  ];

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
      {/*LOGO*/}
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

      {/*RIGHT SIDE NAVIGATION BAR (PHONE SCREEN)*/}
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
      <DropdownSelector openState={menuOpen} setOpenState={setMenuOpen} items={dropDownItems1} />

      {/*RIGHT SIDE NAVIGATION BAR (DESKTOP SCREEN)*/}
      {session.data?.user ? (
        <div className="hidden md:flex grow items-center justify-between font-semibold gap-[2rem]">
          <Link
            href={"/"}
            className="grow text-[26px] font-semibold text-start hover:drop-shadow-lg"
          >
            Explore
          </Link>
          <NavBarProfileCard setProfileMenuOpen={setProfileMenuOpen} profileMenuOpen={profileMenuOpen} username={session.data.user.name ?? ""} />
          <DropdownSelector openState={profileMenuOpen} setOpenState={setProfileMenuOpen} items={dropDownItems2} />
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
