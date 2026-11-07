export type Pet = {
  id: string;
  name: string;
  age: string;
  breed: string;
  location: string;
  description: string;
  image: string;
  images?: string[];
  neutered: boolean;
  status?: "pending" | "approved" | "rejected";
  ownerId?: string;
  createdAt?: Date;
};

export type PetRouteParams = {
  id: string;
  name: string;
  age: string;
  breed: string;
  location: string;
  description: string;
  image: string;
  images?: string;
  neutered: string;
  status?: string;
  ownerId?: string;
};
