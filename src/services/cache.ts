import fs from "fs";
import { RestaurantCache } from "../interfaces/CacheData";
import { fetchChalmrest } from "./chalmrest";

const restCache = "src/data/restaurants.json";

export const fetchChalmrestCache = async () => {
  try {
    const cacheData = JSON.parse(fs.readFileSync(restCache).toString());
    if (cacheData.fetched < Date.now() - 3600000 || cacheData.length < 1) {
      throw new Error("Cache expired");
    }
    return cacheData.restaurants;
  } catch (error: any) {
    console.log(error);
    const restaurants = await fetchChalmrest();
    const data: RestaurantCache = {
      restaurants: restaurants,
      fetched: Date.now(),
    };
    console.log("Fetching new data");
    fs.writeFileSync(restCache, JSON.stringify(data));
    return restaurants;
  }
};
