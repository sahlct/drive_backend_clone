import { Request, Response } from 'express';
import { Folder } from '../models/folder.model';

export const createFolder = async (req: Request, res: Response) => {
  const { name } = req.body;
  const folder = await Folder.create({ name, userId: req.user!.id });
  res.status(201).json(folder);
};

export const getFolders = async (req: Request, res: Response) => {
  const folders = await Folder.find({ userId: req.user!.id });
  res.json(folders);
};

export const getFolder = async (req: Request, res: Response) => {
  const folder = await Folder.findOne({ _id: req.params.id, userId: req.user!.id });
  if (!folder) return res.status(404).json({ message: 'Folder not found' });
  res.json(folder);
};

export const updateFolder = async (req: Request, res: Response) => {
  const folder = await Folder.findOneAndUpdate(
    { _id: req.params.id, userId: req.user!.id },
    { name: req.body.name },
    { new: true }
  );
  if (!folder) return res.status(404).json({ message: 'Folder not found' });
  res.json(folder);
};

export const deleteFolder = async (req: Request, res: Response) => {
  const folder = await Folder.findOneAndDelete({ _id: req.params.id, userId: req.user!.id });
  if (!folder) return res.status(404).json({ message: 'Folder not found' });
  res.json({ message: 'Folder deleted' });
};
