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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chalmrest_1 = require("../services/chalmrest");
const fetchRouter = (0, express_1.Router)();
fetchRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, chalmrest_1.fetchChalmrest)();
    if (data === null) {
        res.send("No data");
        return;
    }
    res.send(data);
}));
exports.default = fetchRouter;
