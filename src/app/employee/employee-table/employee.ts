export interface Employee {
    id: string;
    name: string;
    email: string;
    department: string;
    role: string;
    salary: number;
    joinedDate: string;
    bonus?: number; // optional
  }
  