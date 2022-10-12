import axios from "axios";
import { json } from "express/lib/response";
import { restaurant } from "../interfaces/Restaurant";

export const fetchChalmrest = async () => {
  const restaurantURLs = [
    "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/21f31565-5c2b-4b47-d2a1-08d558129279/dishoccurrences" /*kårrestaurangen*/,
    "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/b672efaf-032a-4bb8-d2a5-08d558129279/dishoccurrences" /*linsen*/,
    "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/a7f0f75b-c1cb-4fc3-d2a6-08d558129279/dishoccurrences" /*hyllan*/,
    "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3ac68e11-bcee-425e-d2a8-08d558129279/dishoccurrences" /*smak*/,
    "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences" /*express*/,
  ];
  const restaurantData = [];
  for (let i = 0; i < restaurantURLs.length; i++) {
    const data = await getRestaurantData(restaurantURLs[i]);
    if (data !== null) {
      restaurantData.push(data);
    }
  }
  return restaurantData;
};

const getRestaurantData = async (url: string) => {
  try {
    const data = await axios.get(url);
    return format(data.data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const format = (json) => {
  try {
    const formatted: restaurant = {
      name: json[0].mealProvidingUnit.mealProvidingUnitName,
      meals: {
        en: [],
        sv: [],
      },
      location: "Chalmers",
    };
    (json as any).map((item: any) => {
      formatted.meals.en.push({
        title: item.dishType.dishTypeNameEnglish,
        lang: "en",
        date: item.startDate,
        summary: item.displayNames.find(
          (element) =>
            element.displayNameCategory.displayNameCategoryName == "English"
        ).dishDisplayName,
      });
      formatted.meals.sv.push({
        title: item.dishType.dishTypeName,
        lang: "sv",
        date: item.startDate,
        summary: item.displayNames.find(
          (element) =>
            element.displayNameCategory.displayNameCategoryName == "Swedish"
        ).dishDisplayName,
      });
    });
    return formatted;
  } catch (error) {
    return null;
  }
};
