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
exports.GameProvider = void 0;
const database_1 = require("../database");
class GameProvider {
    constructor() {
        this.models = {
            game: database_1.GameModel,
        };
    }
    getAllDevelopers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.models.game.distinct("developer");
        });
    }
    getMostSoldGamesForDeveloper(developer) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.models.game.aggregate([
                {
                    $match: { developer },
                },
                {
                    $sort: { globalSales: -1 },
                },
                { $limit: 5 },
                {
                    $project: {
                        name: 1,
                        platform: 1,
                        genre: 1,
                        globalSales: 1,
                        year: 1,
                    },
                },
            ]);
        });
    }
    getMostSoldGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.models.game.aggregate([
                {
                    $group: {
                        _id: { genre: "$genre" },
                        sales: { $sum: "$globalSales" },
                    },
                },
                {
                    $project: {
                        genre: '$_id.genre',
                        sales: '$sales'
                    }
                },
                {
                    $sort: {
                        sales: -1,
                    },
                },
                { $limit: 5 },
            ]);
        });
    }
}
exports.GameProvider = GameProvider;
