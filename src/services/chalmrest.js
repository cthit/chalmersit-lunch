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
    const restaurantURLs = [
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/21f31565-5c2b-4b47-d2a1-08d558129279/dishoccurrences" /*kårrestaurangen*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/b672efaf-032a-4bb8-d2a5-08d558129279/dishoccurrences" /*linsen*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/a7f0f75b-c1cb-4fc3-d2a6-08d558129279/dishoccurrences" /*hyllan*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3ac68e11-bcee-425e-d2a8-08d558129279/dishoccurrences" /*smak*/,
        "http://carbonateapiprod.azurewebsites.net/api/v1/mealprovidingunits/3d519481-1667-4cad-d2a3-08d558129279/dishoccurrences" /*express*/,
    ];
    const restaurantData = [];
    for (let i = 0; i < restaurantURLs.length; i++) {
        const data = yield getRestaurantData(restaurantURLs[i]);
        if (data !== null) {
            restaurantData.push(data);
        }
    }
    return restaurantData;
});
exports.fetchChalmrest = fetchChalmrest;
const getRestaurantData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.get(url);
        return format(data.data);
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
const format = (json) => {
    try {
        const formatted = {
            name: json[0].mealProvidingUnit.mealProvidingUnitName,
            meals: {
                en: [],
                sv: [],
            },
            location: "Chalmers",
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
