"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchChalmrest = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchChalmrest = () => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantURLsJohanneberg = [
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/21f31565-5c2b-4b47-d2a1-08d558129279/dishoccurrences" /*kårrestaurangen*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/b672efaf-032a-4bb8-d2a5-08d558129279/dishoccurrences" /*linsen*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/a7f0f75b-c1cb-4fc3-d2a6-08d558129279/dishoccurrences" /*hyllan*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3ac68e11-bcee-425e-d2a8-08d558129279/dishoccurrences" /*smak*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences" /*express*/,
    ];
    const restaurantURLsLindholmen = [
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/c74da2cf-aa1a-4d3a-9ba6-08d5569587a1/dishoccurrences" /*L's kitchen*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/871c63d7-4ddb-46b8-d2a0-08d558129279/dishoccurrences" /*L's express*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/c6742862-3cc5-47b1-d2a4-08d558129279/dishoccurrences" /*L's resto*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/4dce0df9-c6e7-46cf-d2a7-08d558129279/dishoccurrences" /*Kokboken*/,
    ];
    const restaurantData = [];
    for (const element of restaurantURLsJohanneberg) {
        const data = yield getRestaurantData(element, "Johanneberg");
        if (data !== null) {
            restaurantData.push(data);
        }
    }
    for (const element of restaurantURLsLindholmen) {
        const data = yield getRestaurantData(element, "Lindholmen");
        if (data !== null) {
            restaurantData.push(data);
        }
    }
    return restaurantData;
});
exports.fetchChalmrest = fetchChalmrest;
const getRestaurantData = (url, location) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.get(url);
        return format(data.data, location);
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
const format = (json, location) => {
    try {
        const formatted = {
            name: json[0].mealProvidingUnit.mealProvidingUnitName,
            meals: {
                en: [],
                sv: [],
            },
            location: location,
        };
        json.map((item) => {
            formatted.meals.en.push({
                title: item.dishType.dishTypeNameEnglish,
                lang: "en",
                date: item.startDate,
                summary: item.displayNames.find((element) => element.displayNameCategory.displayNameCategoryName == "English").dishDisplayName,
            });
            formatted.meals.sv.push({
                title: item.dishType.dishTypeName,
                lang: "sv",
                date: item.startDate,
                summary: item.displayNames.find((element) => element.displayNameCategory.displayNameCategoryName == "Swedish").dishDisplayName,
            });
        });
        return formatted;
    }
    catch (error) {
        return null;
    }
};
