import express, { Express } from 'express';
import authRoutes from './routes/auth.routes';
import folderRoutes from './routes/folder.routes';
import fileRoutes from './routes/file.routes';
import { errorHandler } from './middlewares/error.middleware';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Configure CORS to match previous project
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Use specific frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Enable if using cookies/auth
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/files', fileRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;