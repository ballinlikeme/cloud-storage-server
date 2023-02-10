/// <reference types="multer" />
/// <reference types="node" />
import { FileDto } from "../dtos/file.dto";
export declare class FsService {
    createDir(userId: number, path?: string): void;
    createFile(file: Express.Multer.File, dto: FileDto, path: string): void;
    deleteFile(path: string, userId: number, type: string): void;
    deleteDir(path: string, userId: number): void;
    downloadFile(path: string, userId: number, type: string): Buffer;
}
