import express from 'express';
import {
  createFolder,
  getFolders,
  getFolder,
  updateFolder,
  deleteFolder,
} from '../controllers/folder.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authMiddleware);
router.post('/', createFolder);
router.get('/', getFolders);
router.get('/:id', getFolder);
router.put('/:id', updateFolder);
router.delete('/:id', deleteFolder);

export default router;
