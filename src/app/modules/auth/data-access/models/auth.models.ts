export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
  token?: string;
}

export enum Role {
  User = 'User',
  Admin = 'Admin',
}

export interface AuthDTO {
  username: string;
  password: string;
}

export interface AuthResponse {
  firstName: string;
  lastName: string;
  password: string;
  token: string;
  message: string;
  role: string;
  roleId: number;
  permissions: string[];
}
