"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
// Register new user
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await user_model_1.User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: 'Email already registered' });
    }
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await user_model_1.User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User created', userId: user._id });
};
exports.register = register;
// Login: return access + refresh tokens
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_model_1.User.findOne({ email });
    if (!user || !user.password || !(await bcryptjs_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const payload = { userId: user._id };
    const accessToken = (0, jwt_1.generateAccessToken)(payload);
    const refreshToken = (0, jwt_1.generateRefreshToken)(payload);
    res.json({
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
};
exports.login = login;
// Refresh token endpoint
const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.status(400).json({ message: 'No refresh token provided' });
    try {
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        const newAccessToken = (0, jwt_1.generateAccessToken)({ userId: decoded.userId });
        res.json({ accessToken: newAccessToken });
    }
    catch (_a) {
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};
exports.refresh = refresh;
