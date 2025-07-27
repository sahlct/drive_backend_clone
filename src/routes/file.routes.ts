import express from 'express';
import multer from 'multer';
import {
  uploadFile,
  getFilteredFiles,
  deleteFile,
  getFileTypes,
} from '../controllers/file.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const upload = multer();

router.use(authMiddleware);

// File upload (with optional folderId in body)
router.post('/upload', upload.array('files'), uploadFile);
router.get('/', getFilteredFiles);
router.get('/types', getFileTypes);
router.delete('/:id', deleteFile);

export default router;
