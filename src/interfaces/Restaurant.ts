import { food } from "./Food";

export interface restaurant {
  name: string;
  meals: {
    en: food[];
    sv: food[];
  };
  location: string;
}
