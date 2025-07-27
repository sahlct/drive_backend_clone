"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const folder_controller_1 = require("../controllers/folder.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.authMiddleware);
router.post('/', folder_controller_1.createFolder);
router.get('/', folder_controller_1.getFolders);
router.get('/:id', folder_controller_1.getFolder);
router.put('/:id', folder_controller_1.updateFolder);
router.delete('/:id', folder_controller_1.deleteFolder);
exports.default = router;
