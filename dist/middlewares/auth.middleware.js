"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt"); // ✅ use correct one
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = (0, jwt_1.verifyAccessToken)(token); // ✅ NOT verifyRefreshToken
        req.user = { id: decoded.userId };
        next();
    }
    catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
exports.authMiddleware = authMiddleware;
