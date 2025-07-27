"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
// console.log("token secrets", accessSecret, refreshSecret);
const accessExpiresIn = (process.env.JWT_ACCESS_EXPIRES || '15m');
const refreshExpiresIn = (process.env.JWT_REFRESH_EXPIRES || '7d');
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, accessSecret, {
        expiresIn: accessExpiresIn,
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, refreshSecret, {
        expiresIn: refreshExpiresIn,
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, accessSecret);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, refreshSecret);
};
exports.verifyRefreshToken = verifyRefreshToken;
