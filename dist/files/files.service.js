"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const file_model_1 = require("../models/file.model");
const fs_service_1 = require("../fs/fs.service");
const fs_1 = require("fs");
let FilesService = class FilesService {
    constructor(filesRepository, fsService) {
        this.filesRepository = filesRepository;
        this.fsService = fsService;
    }
    async createDir(dto) {
        const parentFile = await this.filesRepository.findOne({
            where: { id: dto.parentId },
        });
        if (parentFile) {
            const path = `${parentFile.path}\\${dto.name}`;
            await this.fsService.createDir(dto.userId, path);
            const file = await this.filesRepository.create(dto);
            file.path = path;
            parentFile.children.push(file.id);
            await parentFile.save();
            await file.save();
            return file;
        }
        else {
            const path = dto.name;
            await this.fsService.createDir(dto.userId, path);
            const file = await this.filesRepository.create(dto);
            file.path = dto.name;
            await file.save();
            return file;
        }
    }
    async uploadFile(file, dto) {
        let parentFile = null;
        if (dto.parentId) {
            parentFile = await this.filesRepository.findOne({ where: { id: dto.parentId } });
        }
        if (parentFile) {
            const type = file.originalname.split('.').pop();
            const path = `${parentFile.path}\\${dto.name}.${type}`;
            await this.fsService.createFile(file, dto, path);
            const newFile = await this.filesRepository.create(dto);
            newFile.path = path;
            newFile.type = type;
            newFile.size = file.size;
            parentFile.size = parentFile.size + file.size;
            parentFile.children.push(newFile.id);
            await newFile.save();
            await parentFile.save();
            return newFile;
        }
        else {
            const type = file.originalname.split('.').pop();
            const path = `${dto.name}.${type}`;
            await this.fsService.createFile(file, dto, path);
            const newFile = await this.filesRepository.create(dto);
            newFile.path = dto.name;
            newFile.type = type;
            newFile.size = file.size;
            await newFile.save();
            return newFile;
        }
    }
    async getFiles(dto) {
        const { userId, parentId } = dto;
        return await this.filesRepository.findAll({ where: { userId, parentId } });
    }
    async deleteFile(dto) {
        const file = await this.filesRepository.findOne({ where: { id: dto.fileId } });
        if (file.type === "dir") {
            await this.fsService.deleteDir(file.path, file.userId);
            if (file.children.length > 0) {
                const files = await this.filesRepository.findAll({ where: { parentId: file.id } });
                for (const oneFile of files) {
                    await this.filesRepository.destroy({ where: { id: oneFile.id } });
                }
            }
        }
        else {
            await this.fsService.deleteFile(file.path, file.userId, file.type);
        }
        await this.filesRepository.destroy({ where: { id: dto.fileId } });
        return file;
    }
    async downloadFile(fileId) {
        const file = await this.filesRepository.findOne({ where: { id: fileId } });
        const filePath = `${process.env.FILES_STORAGE_PATH}\\${file.userId}\\${file.name}.${file.type}`;
        return (0, fs_1.createReadStream)(filePath);
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(file_model_1.File)),
    __metadata("design:paramtypes", [Object, fs_service_1.FsService])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map