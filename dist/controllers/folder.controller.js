"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFolder = exports.updateFolder = exports.getFolder = exports.getFolders = exports.createFolder = void 0;
const folder_model_1 = require("../models/folder.model");
const createFolder = async (req, res) => {
    const { name } = req.body;
    const folder = await folder_model_1.Folder.create({ name, userId: req.user.id });
    res.status(201).json(folder);
};
exports.createFolder = createFolder;
const getFolders = async (req, res) => {
    const folders = await folder_model_1.Folder.find({ userId: req.user.id });
    res.json(folders);
};
exports.getFolders = getFolders;
const getFolder = async (req, res) => {
    const folder = await folder_model_1.Folder.findOne({ _id: req.params.id, userId: req.user.id });
    if (!folder)
        return res.status(404).json({ message: 'Folder not found' });
    res.json(folder);
};
exports.getFolder = getFolder;
const updateFolder = async (req, res) => {
    const folder = await folder_model_1.Folder.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { name: req.body.name }, { new: true });
    if (!folder)
        return res.status(404).json({ message: 'Folder not found' });
    res.json(folder);
};
exports.updateFolder = updateFolder;
const deleteFolder = async (req, res) => {
    const folder = await folder_model_1.Folder.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!folder)
        return res.status(404).json({ message: 'Folder not found' });
    res.json({ message: 'Folder deleted' });
};
exports.deleteFolder = deleteFolder;
