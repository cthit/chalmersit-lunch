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
exports.fetchChalmrestCache = void 0;
const fs_1 = __importDefault(require("fs"));
const chalmrest_1 = require("./chalmrest");
const restCache = "src/data/restaurants.json";
const fetchChalmrestCache = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheData = JSON.parse(fs_1.default.readFileSync(restCache).toString());
        if (cacheData.fetched < Date.now() - 3600000 || cacheData.length < 1) {
            console.log(cacheData);
            throw new Error("Cache expired");
        }
        console.log(cacheData);
        return cacheData.restaurants;
    }
    catch (error) {
        console.log(error);
        const restaurants = yield (0, chalmrest_1.fetchChalmrest)();
        const data = {
            restaurants: restaurants,
            fetched: Date.now(),
        };
        fs_1.default.writeFileSync(restCache, JSON.stringify(data));
        return restaurants;
    }
});
exports.fetchChalmrestCache = fetchChalmrestCache;
