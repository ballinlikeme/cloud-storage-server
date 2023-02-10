/// <reference types="multer" />
import { FilesService } from "./files.service";
import { FileDto } from "../dtos/file.dto";
import { Request, Response } from "express";
import { DeleteFileDto } from "../dtos/delete-file.dto";
export declare class FilesController {
    private filesService;
    constructor(filesService: FilesService);
    createDir(dto: FileDto): Promise<import("../models/file.model").File>;
    getFiles(request: Request): Promise<import("../models/file.model").File[]>;
    uploadFile(file: Express.Multer.File, dto: FileDto): Promise<import("../models/file.model").File>;
    deleteFile(dto: DeleteFileDto): Promise<import("../models/file.model").File>;
    downloadFile(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}
