"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_1 = __importDefault(require("./game"));
const router = express_1.Router();
router.get('/health-check', (req, res) => {
    res.send({
        status: 'Success',
        time: Date.now()
    });
});
router.use('/games', game_1.default);
exports.default = router;
