"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSchema = void 0;
const mongoose_1 = require("mongoose");
exports.GameSchema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    platform: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    year: {
        type: mongoose_1.SchemaTypes.Number,
        required: true
    },
    genre: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    publisher: {
        type: mongoose_1.SchemaTypes.String,
        required: true
    },
    NASales: {
        type: mongoose_1.SchemaTypes.Number,
        required: true
    },
    EUSales: {
        type: mongoose_1.SchemaTypes.Number,
        required: true
    },
    JPSales: {
        type: mongoose_1.SchemaTypes.Number,
        required: true
    },
    otherSales: {
        type: mongoose_1.SchemaTypes.Number,
        required: true
    },
    globalSales: {
        type: mongoose_1.SchemaTypes.Number,
        required: true
    },
    criticScore: {
        type: mongoose_1.SchemaTypes.Number,
    },
    criticCount: {
        type: mongoose_1.SchemaTypes.Number,
    },
    userScore: {
        type: mongoose_1.SchemaTypes.String,
    },
    userCount: {
        type: mongoose_1.SchemaTypes.Number,
    },
    developer: {
        type: mongoose_1.SchemaTypes.String,
    },
    rating: {
        type: mongoose_1.SchemaTypes.String,
    }
});
