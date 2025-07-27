"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkS3Connection = exports.s3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const checkS3Connection = async () => {
    try {
        const response = await exports.s3.send(new client_s3_1.ListBucketsCommand({}));
        console.log("✅ Connected to S3 successfully");
        console.log("Buckets:", response.Buckets);
    }
    catch (error) {
        console.error("❌ Failed to connect to S3", error);
    }
};
exports.checkS3Connection = checkS3Connection;
