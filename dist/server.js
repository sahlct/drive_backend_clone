"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const dotenv_1 = __importDefault(require("dotenv"));
const s3_1 = require("./config/s3");
dotenv_1.default.config();
// Default to 5000 if PORT is not set, consistent with previous project
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        // Connect to MongoDB
        await (0, db_1.connectDB)();
        console.log('MongoDB connected successfully');
        // Start the server
        app_1.default.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            // Check S3 connection after server starts
            (0, s3_1.checkS3Connection)().catch((err) => {
                console.error('S3 connection failed:', err);
            });
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit on failure to connect to DB
    }
};
startServer();
