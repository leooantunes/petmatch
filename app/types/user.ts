export type User = {
  id?: string;
  uid?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  age?: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type UserRegistration = {
  email: string;
  phone: string;
  city: string;
  password: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  age: string;
  city: string;
  password: string;
};
