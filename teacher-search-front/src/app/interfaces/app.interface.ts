export interface User {
  login: string;
  role: string;
  avatarUrl: string;
  firstName: string;
  secondName: string;
}

export interface CreateUserInterface {
  id: string;
  login: string;
  firstName: string;
  secondName: string;
  lastName: string;
  role: string;
}
export interface Teacher {
  user: User;
  faculty: string;
  department: string;
  status: string;
  housingNumber: number;
  cabinetNumber: number;
}
