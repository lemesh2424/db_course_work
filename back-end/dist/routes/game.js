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
const providers_1 = require("../providers/");
const router = express_1.Router();
router.get("/developers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new providers_1.GameProvider();
    const developers = yield provider.getAllDevelopers();
    res.send({
        status: 'Success',
        data: developers
    });
}));
router.get('/developers/most-sold', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new providers_1.GameProvider();
    const developer = req.query.developer;
    const games = yield provider.getMostSoldGamesForDeveloper((developer === null || developer === void 0 ? void 0 : developer.toString()) || '');
    res.send({
        status: 'Success',
        data: games
    });
}));
router.get('/genre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new providers_1.GameProvider();
    const games = yield provider.getMostSoldGenres();
    res.send({
        status: 'Success',
        data: games
    });
}));
exports.default = router;
