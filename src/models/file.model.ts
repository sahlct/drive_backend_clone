import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    filename: String,
    size: Number,
    url: String,
    contentType: String,
    key: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
  },
  { timestamps: true }
);

export const File = mongoose.model('File', fileSchema);
