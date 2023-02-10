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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const file_dto_1 = require("../dtos/file.dto");
const platform_express_1 = require("@nestjs/platform-express");
let FilesController = class FilesController {
    constructor(filesService) {
        this.filesService = filesService;
    }
    createDir(dto) {
        console.log(dto);
        return this.filesService.createDir(dto);
    }
    getFiles(request) {
        const { userId, parentId } = request.query;
        return this.filesService.getFiles({ userId: Number(userId), parentId: Number(parentId) || null });
    }
    uploadFile(file, dto) {
        return this.filesService.uploadFile(file, dto);
    }
    deleteFile(dto) {
        console.log(dto);
        return this.filesService.deleteFile(dto);
    }
    async downloadFile(request, response) {
        const { fileId } = request.query;
        const file = await this.filesService.downloadFile(Number(fileId));
        return file.pipe(response);
    }
};
__decorate([
    (0, common_1.Post)("/createDir"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_dto_1.FileDto]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "createDir", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "getFiles", null);
__decorate([
    (0, common_1.Post)('/uploadFile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_dto_1.FileDto]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)('/deleteFile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "deleteFile", null);
__decorate([
    (0, common_1.Get)('/downloadFile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "downloadFile", null);
FilesController = __decorate([
    (0, common_1.Controller)("files"),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map