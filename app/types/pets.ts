export type Pet = {
  id: string;
  name: string;
  age: string;
  breed: string;
  location: string;
  description: string;
  image: string;
  neutered: boolean;
};

export type PetRouteParams = {
  id: string;
  name: string;
  age: string;
  breed: string;
  location: string;
  description: string;
  image: string;
  neutered: string;
};
