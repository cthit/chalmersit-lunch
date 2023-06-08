import axios from "axios";
import { json } from "express/lib/response";
import { food } from "../interfaces/Food";
import { restaurant } from "../interfaces/Restaurant";

const restaurantIDs = [
  {
    id: "21f31565-5c2b-4b47-d2a1-08d558129279",
    name: "Kårrestaurangen",
    location: "Johanneberg",
  },
  {
    id: "3ac68e11-bcee-425e-d2a8-08d558129279",
    name: "SMAK",
    location: "Johanneberg",
  },
  {
    id: "3d519481-1667-4cad-d2a3-08d558129279",
    name: "EXPRESS",
    location: "Johanneberg",
  },
  {
    id: "c74da2cf-aa1a-4d3a-9ba6-08d5569587a1",
    name: "L's Kitchen",
    location: "Lindholmen",
  },
];

export const fetchChalmrest = async () => {
  const restaurantData = [];
  for (const element of restaurantIDs) {
    const data = await getRestaurantData(element.id, element.location);
    if (data !== null) {
      restaurantData.push(data);
    }
  }
  return restaurantData;
};

const getRestaurantData = async (url: string, location: string) => {
  try {
    const cD = new Date();
    const cDString = `${cD.getFullYear()}-${cD.getMonth() + 1}-${cD.getDate()}`;
    const graphQlEndpoint =
      "https://plateimpact-heimdall.azurewebsites.net/graphql";
    const axiosQuery = {
      operationName: "MealQuery",
      query:
        "query MealQuery($mealProvidingUnitID: String, $startDate: String, $endDate: String) {\n dishOccurrencesByTimeRange(mealProvidingUnitID: $mealProvidingUnitID, startDate: $startDate, endDate: $endDate) {\n displayNames {\n sortOrder\n name\n categoryName\n }\n startDate\n dishType {\n name\n }\n mealProvidingUnit {\n mealProvidingUnitName\n id\n }\n }\n }",
      variables: {
        mealProvidingUnitID: url,
        startDate: cDString,
        endDate: cDString,
      },
    };
    const res = await axios.post(graphQlEndpoint, axiosQuery);
    console.log(res.data.data);
    return format(res.data.data.dishOccurrencesByTimeRange, location, cDString);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const format = (json: any, location: string, currDate: string) => {
  if (json === null) {
    console.log("json is null");
    return null;
  }
  try {
    const formatted: restaurant = {
      name: json[0].mealProvidingUnit.mealProvidingUnitName,
      meals: {
        en: [],
        sv: [],
      },
      location: location,
    };
    for (const element of json) {
      const mealSE: food = {
        title: element.dishType.name,
        lang: "sv",
        date: currDate,
        summary: element.displayNames.filter((unit: any) => unit.categoryName == "Swedish")[0].name,
      };
      const mealEN: food = {
        title: element.dishType.name,
        lang: "en",
        date: currDate,
        summary: element.displayNames.filter((unit: any) => unit.categoryName == "English")[0].name,
      };
      formatted.meals.sv.push(mealSE);
      formatted.meals.en.push(mealEN);
    }
    console.log(formatted);
    return formatted;
  } catch (error) {
    console.log("Something went wrong when formatting the data");
    return null;
  }
};
