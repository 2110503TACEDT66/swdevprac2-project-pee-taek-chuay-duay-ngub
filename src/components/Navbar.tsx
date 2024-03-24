import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between bg-cutoff-white text-black fixed w-full h-[105px] z-20 top-0 border-2 border-gray-300 px-[2rem]">
      <div className="flex items-center">
        <Image
          src="/images/cedt-logo.png"
          width={120}
          height={45}
          alt="CEDT Logo"
        />
        <div className="text-[42px] font-semibold select-none">
          JOB<span className="text-[#A11F2C]">F</span>AIR
        </div>
        <button className="ml-[2rem] text-[26px] font-semibold">
          Explore
        </button>
      </div>
      <div className="flex items-center justify-between font-semibold gap-[2rem]">
        <button type="button" className="text-[26px]">
          Login
        </button>
        <button
          type="button"
          className="bg-primary text-white px-[1rem] text-[26px] rounded-[10px] h-[55px] border-2 border-transparent hover:bg-cutoff-white hover:border-primary hover:text-primary"
        >
          Register
        </button>
      </div>
    </div>
  );
}
