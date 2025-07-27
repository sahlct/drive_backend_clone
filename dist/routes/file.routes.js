"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const file_controller_1 = require("../controllers/file.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
router.use(auth_middleware_1.authMiddleware);
// File upload (with optional folderId in body)
router.post('/upload', upload.array('files'), file_controller_1.uploadFile);
router.get('/', file_controller_1.getFilteredFiles);
router.get('/types', file_controller_1.getFileTypes);
router.delete('/:id', file_controller_1.deleteFile);
exports.default = router;
