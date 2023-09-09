import { IBaseStoreState } from "./base";

export interface IRestaurantState {
  restaurants: IBaseStoreState<IRestaurant[]>;
  restaurant: IBaseStoreState<Partial<IRestaurant> | null>;
}

export interface IRestaurant {
  id: number;
  name: string;
  email: string;
  description: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}
