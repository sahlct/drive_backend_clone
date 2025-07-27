"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBytes = void 0;
const formatBytes = (bytes) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'], i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
exports.formatBytes = formatBytes;
