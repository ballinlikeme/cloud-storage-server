"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const fs_1 = require("fs");
let FsService = class FsService {
    createDir(userId, path) {
        let filePath = '';
        if (path) {
            filePath = `${process.env.FILES_STORAGE_PATH}\\${userId}\\${path}`;
        }
        else {
            filePath = `${process.env.FILES_STORAGE_PATH}\\${userId}`;
        }
        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            else {
                throw new common_1.HttpException('File already exists', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, e.status);
        }
    }
    createFile(file, dto, path) {
        const filePath = `${process.env.FILES_STORAGE_PATH}\\${dto.userId}\\${path}`;
        try {
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, file.buffer);
            }
            else {
                throw new common_1.HttpException('File already exists', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, e.status);
        }
    }
    deleteFile(path, userId, type) {
        const filePath = `${process.env.FILES_STORAGE_PATH}\\${userId}\\${path}.${type}`;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            else {
                throw new common_1.HttpException('File does not exist', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, e.status);
        }
    }
    deleteDir(path, userId) {
        const filePath = `${process.env.FILES_STORAGE_PATH}\\${userId}\\${path}`;
        try {
            if (fs.existsSync(filePath)) {
                fs.rmdirSync(filePath, { recursive: true });
            }
            else {
                throw new common_1.HttpException('Folder does not exist', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (e) {
            throw new common_1.HttpException(e.message, e.status);
        }
    }
    downloadFile(path, userId, type) {
        const filePath = `${process.env.FILES_STORAGE_PATH}\\${userId}\\${path}.${type}`;
        const file = (0, fs_1.readFileSync)(filePath);
        return file;
    }
};
FsService = __decorate([
    (0, common_1.Injectable)()
], FsService);
exports.FsService = FsService;
//# sourceMappingURL=fs.service.js.map