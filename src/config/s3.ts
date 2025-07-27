import { S3Client , ListBucketsCommand} from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const checkS3Connection = async () => {
  
  try {
    const response = await s3.send(new ListBucketsCommand({}));
    console.log("✅ Connected to S3 successfully");
    console.log("Buckets:", response.Buckets);
  } catch (error) {
    console.error("❌ Failed to connect to S3", error);
  }
};