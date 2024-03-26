export interface User {
  _id: string;
  name: string;
  email: string;
  telephoneNumber: string;
  role: string;
  company?: string;
}

export interface Company {
  id: string;
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

];

export const mockCompany: Company[] = [
];

export const mockInterview: Interview[] = [

];
