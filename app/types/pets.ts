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
  isApproved?: boolean;
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
  isApproved?: string;
  ownerId?: string;
};
