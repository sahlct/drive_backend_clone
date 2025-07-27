import app from './app';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import { checkS3Connection } from './config/s3';

dotenv.config();

// Default to 5000 if PORT is not set, consistent with previous project
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('MongoDB connected successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      // Check S3 connection after server starts
      checkS3Connection().catch((err) => {
        console.error('S3 connection failed:', err);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Exit on failure to connect to DB
  }
};

startServer();