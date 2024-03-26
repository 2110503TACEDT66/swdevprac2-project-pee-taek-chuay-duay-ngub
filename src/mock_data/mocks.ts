export interface User {
  _id: string;
  name: string;
  email: string;
  telephoneNumber: string;
  role: string;
  company?: string;
}

export interface Company {
  _id: string;
  name: string;
  address: string;
  website: string;
  image: string;
  description: string;
  telephoneNumber: string;
}

export interface Interview {
  _id: string;
  user: string;
  company: string;
  date: string;
}

export const mockUser: User[] = [
  {
    _id: "1",
    name: "User 1",
    email: "user1@gmail.com",
    telephoneNumber: "0123456789",
    role: "user",
  },
  {
    _id: "2",
    name: "User 2",
    email: "user2@gmail.com",
    telephoneNumber: "0123456789",
    role: "admin",
  },
  {
    _id: "3",
    name: "User 3",
    email: "user3@gmail.com",
    telephoneNumber: "0123456789",
    role: "company",
    company: "1",
  },
];

export const mockCompany: Company[] = [
  {
    _id: "1",
    name: "Company 1",
    address: "123 Main Street",
    website: "www.example.com/company1",
    image:
      "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
    description: "Description of company 1",
    telephoneNumber: "123-456-7890",
  },
  {
    _id: "2",
    name: "Company 2",
    address: "456 Elm Street",
    website: "www.example.com/company2",
    image:
      "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
    description: "Description of company 2",
    telephoneNumber: "456-789-0123",
  },
  {
    _id: "3",
    name: "Company 3",
    address: "456 Elm Street",
    website: "www.example.com/company2",
    image:
      "https://assets.baanfinder.com/gz6hk3s7d3dqfdq67t75t5ovsr4uuj7rr6xs46qd1rk0n0xmwlzcp9l1tj5g9zdvzjcbgl1fh1midovjai1k9zhlquuykebscnesbfw41tje2fizrvzat1hcsqiyhx4w.jpg",
    description: "Description of company 2",
    telephoneNumber: "456-789-0123",
  },
];

export const mockInterview: Interview[] = [
  {
    _id: "1",
    user: "1",
    company: "1",
    date: "2022-01-01",
  },
  {
    _id: "2",
    user: "1",
    company: "2",
    date: "2022-01-02",
  },
];
