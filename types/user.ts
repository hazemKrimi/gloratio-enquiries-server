export type UserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zip: number;
  role?: 'user' | 'customer' | 'admin';
};

export type UserUpdateInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  zip?: number;
};
