"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const fileSchema = new mongoose_1.default.Schema({
    filename: String,
    size: Number,
    url: String,
    contentType: String,
    key: String,
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    folderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Folder', default: null },
}, { timestamps: true });
exports.File = mongoose_1.default.model('File', fileSchema);
