export interface Organization {
  _id: string;
  name: string;
  email: string;
  image: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  _id: string;
  organization: Organization | string;
  title: string;
  description: string;
  minSalary: number;
  maxSalary?: number;
  deadline: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}
