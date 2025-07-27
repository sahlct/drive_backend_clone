"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getFileTypes = exports.getFilteredFiles = exports.uploadFile = void 0;
const file_model_1 = require("../models/file.model");
const folder_model_1 = require("../models/folder.model");
const s3_1 = require("../config/s3");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
// Upload files with optional folderId
const uploadFile = async (req, res) => {
    var _a;
    const files = req.files;
    const uploaded = [];
    const folderId = req.body.folderId || null;
    // If folderId provided, validate it belongs to the user
    if (folderId) {
        const folderExists = await folder_model_1.Folder.findOne({ _id: folderId, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!folderExists) {
            return res.status(400).json({ message: 'Invalid folder ID' });
        }
    }
    for (const file of files) {
        const key = `uploads/${(0, uuid_1.v4)()}-${file.originalname}`;
        await s3_1.s3.send(new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        }));
        const newFile = await file_model_1.File.create({
            filename: file.originalname,
            size: file.size,
            url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
            contentType: file.mimetype,
            key,
            userId: req.user.id,
            folderId: folderId || null,
        });
        uploaded.push(newFile);
    }
    res.status(201).json(uploaded);
};
exports.uploadFile = uploadFile;
// Get files with filters
const getFilteredFiles = async (req, res) => {
    const { folderId, type, search } = req.query;
    const query = { userId: req.user.id };
    if (folderId === 'null') {
        query.folderId = null;
    }
    else if (folderId) {
        query.folderId = folderId;
    }
    if (type)
        query.contentType = type;
    if (search)
        query.filename = { $regex: new RegExp(search, 'i') };
    const files = await file_model_1.File.find(query);
    res.json(files);
};
exports.getFilteredFiles = getFilteredFiles;
// Get unique file types
const getFileTypes = async (req, res) => {
    const types = await file_model_1.File.find({ userId: req.user.id }).distinct('contentType');
    res.json(types);
};
exports.getFileTypes = getFileTypes;
// Delete file (from S3 + DB)
const deleteFile = async (req, res) => {
    var _a;
    const file = await file_model_1.File.findById(req.params.id);
    if (!file || !file.userId || file.userId.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
        return res.status(404).json({ message: 'File not found or unauthorized' });
    }
    if (file.key) {
        await s3_1.s3.send(new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.key,
        }));
    }
    await file.deleteOne();
    res.json({ message: 'File deleted' });
};
exports.deleteFile = deleteFile;
