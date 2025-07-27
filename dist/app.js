"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const folder_routes_1 = __importDefault(require("./routes/folder.routes"));
const file_routes_1 = __importDefault(require("./routes/file.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Configure CORS to match previous project
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || '*', // Use specific frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Enable if using cookies/auth
}));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/folders', folder_routes_1.default);
app.use('/api/files', file_routes_1.default);
// Error handling middleware (must be last)
app.use(error_middleware_1.errorHandler);
exports.default = app;
