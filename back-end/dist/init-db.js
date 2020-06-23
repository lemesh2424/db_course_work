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
exports.parse = exports.ParsePromise = void 0;
const fs_1 = __importDefault(require("fs"));
const papaparse_1 = __importDefault(require("papaparse"));
const database_1 = require("./database");
const joi_1 = __importDefault(require("@hapi/joi"));
const CSVHeaderMap = {
    Name: 'name',
    Platform: 'platform',
    Year_of_Release: 'year',
    Genre: 'genre',
    Publisher: 'publisher',
    NA_Sales: 'NASales',
    EU_Sales: 'EUSales',
    JP_Sales: 'JPSales',
    Other_Sales: 'otherSales',
    Global_Sales: 'globalSales',
    Critic_Score: 'criticScore',
    Critic_Count: 'criticCount',
    User_Score: 'userScore',
    User_Count: 'userCount',
    Developer: 'developer',
    Rating: 'rating'
};
const validationSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    platform: joi_1.default.string().required(),
    year: joi_1.default.number().required(),
    genre: joi_1.default.string().required(),
    publisher: joi_1.default.string().required(),
    NASales: joi_1.default.number().required(),
    EUSales: joi_1.default.number().required(),
    JPSales: joi_1.default.number().required(),
    otherSales: joi_1.default.number().required(),
    globalSales: joi_1.default.number().required(),
    criticScore: joi_1.default.number().optional(),
    criticCount: joi_1.default.number().optional(),
    userScore: joi_1.default.string().optional().allow(''),
    userCount: joi_1.default.number().optional(),
    developer: joi_1.default.string().optional().allow(''),
    rating: joi_1.default.string().optional().allow('')
});
exports.ParsePromise = (file) => {
    return new Promise(function (complete, error) {
        papaparse_1.default.parse(file, { complete, error, header: true });
    });
};
exports.parse = () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.initConnetion();
    const stream = fs_1.default.createReadStream(process.cwd() + '/dataset/video-games-sales.csv');
    const { data } = yield exports.ParsePromise(stream);
    const documents = data.map(game => {
        const keys = Object.keys(game);
        const document = keys.reduce((acc, gk) => {
            const value = game[gk] || undefined;
            return Object.assign(Object.assign({}, acc), { [CSVHeaderMap[gk]]: value });
        }, {});
        const { error } = validationSchema.validate(document);
        if (!error) {
            return document;
        }
        else {
            return undefined;
        }
    }).filter(document => !!document);
    yield database_1.GameModel.insertMany(documents);
});
exports.parse();
