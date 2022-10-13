import { restaurant } from "./Restaurant";

export interface RestaurantCache {
  restaurants: restaurant[];
  fetched: number;
}
