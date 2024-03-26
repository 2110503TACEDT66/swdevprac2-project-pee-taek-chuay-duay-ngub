"use client";

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
    description: "Description of job 1",
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
    description: "Description of job 2",
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
    description: "Description of job 2",
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
    description: "Description of job 1",
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
    description: "Description of job 2",
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
    description: "Description of job 2",
    telephoneNumber: "456-789-0123",
    __v: 0,
    id: "2",
  },
];

export default function Home({ params }: { params: { companyId: string } }) {
  const company = mockJobs.find((job) => job._id === params.companyId);

  return (
    <div className="text-black bg-white h-[100vh]">
      <div className="bg-blue-300 flex justify-center items-center">
        <img src={company?.image} alt="company image" />
        <div>
          <div>{company?.name}</div>
          <div>
            <div>รายละเอียดบริษัท</div>
            <div>{company?.description}</div>
          </div>
          <div>
            <div>วันที่ต้องการจอง</div>
            Date Picker goes here naha
          </div>
          <button>ยืนยันการจอง</button>
        </div>
      </div>
    </div>
  );
}
