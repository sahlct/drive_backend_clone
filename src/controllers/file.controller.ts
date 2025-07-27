import { Request, Response } from 'express';
import { File } from '../models/file.model';
import { Folder } from '../models/folder.model';
import { s3 } from '../config/s3';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

// Upload files with optional folderId
export const uploadFile = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const uploaded = [];
  const folderId = req.body.folderId || null;

  // If folderId provided, validate it belongs to the user
  if (folderId) {
    const folderExists = await Folder.findOne({ _id: folderId, userId: req.user?.id });
    if (!folderExists) {
      return res.status(400).json({ message: 'Invalid folder ID' });
    }
  }

  for (const file of files) {
    const key = `uploads/${uuid()}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const newFile = await File.create({
      filename: file.originalname,
      size: file.size,
      url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
      contentType: file.mimetype,
      key,
      userId: req.user!.id,
      folderId: folderId || null,
    });

    uploaded.push(newFile);
  }

  res.status(201).json(uploaded);
};


// Get files with filters
export const getFilteredFiles = async (req: Request, res: Response) => {
  const { folderId, type, search } = req.query;
  const query: any = { userId: req.user!.id };

  if (folderId === 'null') {
    query.folderId = null;
  } else if (folderId) {
    query.folderId = folderId;
  }

  if (type) query.contentType = type;
  if (search) query.filename = { $regex: new RegExp(search as string, 'i') };

  const files = await File.find(query);
  res.json(files);
};

// Get unique file types
export const getFileTypes = async (req: Request, res: Response) => {
  const types = await File.find({ userId: req.user!.id }).distinct('contentType');
  res.json(types);
};

// Delete file (from S3 + DB)
export const deleteFile = async (req: Request, res: Response) => {
  const file = await File.findById(req.params.id);

  if (!file || !file.userId || file.userId.toString() !== req.user?.id) {
    return res.status(404).json({ message: 'File not found or unauthorized' });
  }

  if (file.key) {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: file.key,
      })
    );
  }

  await file.deleteOne();
  res.json({ message: 'File deleted' });
};
