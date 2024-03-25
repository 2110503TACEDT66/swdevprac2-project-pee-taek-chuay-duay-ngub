import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center my-auto">
          <Image
            src="/images/cedt-logo.png"
            width={350}
            height={90}
            alt="CEDT Logo"
          />
          <div className="text-[120px] font-bold select-none">
            JOB<span className="text-[#A11F2C]">F</span>AIR
          </div>
        </div>
        <div className="text-[32px] my-[20px] font-light">
          เปิดประตูสู่อนาคตที่คุณต้องการด้วยงานในฝัน<br></br>
          ค้นหาโอกาสมากมายของคุณที่นี่
        </div>
        <Link
            href={"/auth/signup"}
            className="mx-auto mt-5 flex items-center justify-center bg-primary text-white px-[1rem] text-[24px] rounded-[10px] h-[55px] border-2 border-transparent hover:bg-cutoff-white hover:border-primary hover:text-primary flex-none w-[30%]"
          >
            ค้นหาบริษัท
          </Link>
      </div>
    </main>
  );
}
