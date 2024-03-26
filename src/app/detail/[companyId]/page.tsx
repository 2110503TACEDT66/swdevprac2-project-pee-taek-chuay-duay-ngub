"use client";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";

interface Job {
  _id: string;
  name: string;
  address: string;
  website: string;
  image: string;
  description: string;
  telephoneNumber: string;
  __v: number;
  id: string;
}

const mockJobs: Job[] = [
  {
    _id: "1",
    name: "Job 1",
    address: "123 Main Street",
    website: "www.example.com/job1",
    image:
      "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
    description: "Lofkjnwfklfklwmfklw klgerklfgmr3kmkrlwefmkl",
    telephoneNumber: "123-456-7890",
    __v: 0,
    id: "1",
  },
  {
    _id: "2",
    name: "Job 2",
    address: "456 Elm Street",
    website: "www.example.com/job2",
    image:
      "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
    description: "Lofkjnwfklfklwmfklw klgerklfgmr3kmkrlwefmkl 2",
    telephoneNumber: "456-789-0123",
    __v: 0,
    id: "2",
  },
  {
    _id: "3",
    name: "Job 3",
    address: "456 Elm Street",
    website: "www.example.com/job2",
    image:
      "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
    description: "Lofkjnwfklfklwmfklw klgerklfgmr3kmkrlwefmkl 2",
    telephoneNumber: "456-789-0123",
    __v: 0,
    id: "2",
  },
  {
    _id: "4",
    name: "Job 4",
    address: "123 Main Street",
    website: "www.example.com/job1",
    image:
      "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
    description: "Lofkjnwfklfklwmfklw klgerklfgmr3kmkrlwefmkl 1",
    telephoneNumber: "123-456-7890",
    __v: 0,
    id: "1",
  },
  {
    _id: "5",
    name: "Job 5",
    address: "456 Elm Street",
    website: "www.example.com/job2",
    image:
      "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
    description: "Lofkjnwfklfklwmfklw klgerklfgmr3kmkrlwefmkl 2",
    telephoneNumber: "456-789-0123",
    __v: 0,
    id: "2",
  },
  {
    _id: "6",
    name: "Job 6",
    address: "456 Elm Street",
    website: "www.example.com/job2",
    image:
      "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
    description: "Lofkjnwfklfklwmfklw klgerklfgmr3kmkrlwefmkl 2",
    telephoneNumber: "456-789-0123",
    __v: 0,
    id: "2",
  },
];

export default function Home({ params }: { params: { companyId: string } }) {
  const company = mockJobs.find((job) => job._id === params.companyId);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date:any) => {
    setSelectedDate(date);
  }
  return (
    <div className="text-black bg-white h-[100vh]">
      <div className="py-[40px]"></div>
      <div className="border-2 border-gray-300 rounded-2xl w-[70%] mx-auto">
        <div className="flex justify-around mx-auto p-5 py-[50px]">
          <div>
            <div className="mb-2">
              <Link  href={'/explore'} className="mb-[20px] text-[20px]">
              <FontAwesomeIcon icon={faArrowLeftLong} className="fas fa-check" style={{ color: "black" }}
                  ></FontAwesomeIcon> ย้อนกลับ
              </Link>
            </div>
            <img className="rounded" src={company?.image} alt="company image" width={600} height={800} />
          </div>

          <div>
            <div className="my-4 font-semibold text-3xl">{company?.name}</div>
            <div>
              <div className="mt-2 font-semibold">รายละเอียดบริษัท</div>
              <div className="font-medium text-[18px] w-[200px]">{company?.description}</div>
            </div>
            <div>
              <div className="font-semibold mt-4">วันที่ต้องการจอง</div>
              <div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: any) => setSelectedDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="Time"
                  className="border-2 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button className="mt-5 flex items-center justify-center bg-primary text-white px-[1rem] text-[18px] rounded-[10px] h-[55px] border-2 border-transparent hover:bg-cutoff-white hover:border-primary hover:text-primary flex-none">
              ยืนยันการจอง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
