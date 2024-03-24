import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

type Item = {
  text: string;
  url: string;
};

type Props = {
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
  items: Item[];
};

export default function DropdownSelector({
  openState,
  setOpenState,
  items,
}: Props) {
  return (
    openState && (
      <div className="absolute top-[5rem] right-[1rem] mt-2 bg-white shadow-lg rounded-md py-2 w-[15rem]">
        {items.map(({ text, url }) => (
          <Link
            key={text}
            href={url}
            onClick={() => setOpenState(false)}
            className="block px-4 py-2 text-[16px] text-gray-800 hover:bg-gray-200 w-full text-left"
          >
            {text}
          </Link>
        ))}
      </div>
    )
  );
}
