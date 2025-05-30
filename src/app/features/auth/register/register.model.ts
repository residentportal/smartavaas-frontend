export interface Register {
  id?: number;
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
  roles?: Array<Role>;
}

export interface Role {
  role?: string;
}
