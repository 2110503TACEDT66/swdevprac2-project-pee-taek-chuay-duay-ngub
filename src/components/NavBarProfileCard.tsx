import React, { Dispatch, SetStateAction } from "react";

type Props = {
  profileMenuOpen: boolean;
  setProfileMenuOpen: Dispatch<SetStateAction<boolean>>;
  username: string;
  role: string;
};

export default function NavBarProfileCard({ setProfileMenuOpen, profileMenuOpen, username, role }: Props) {
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
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
        <div className="text-xl">{username}</div>
        <div className="text-sm text-gray-600">{
          role
        }</div>
      </div>
    </button>
  );
}
