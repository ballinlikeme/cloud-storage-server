/// <reference types="multer" />
/// <reference types="node" />
import { File } from "../models/file.model";
import { FsService } from "../fs/fs.service";
import { FileDto } from "../dtos/file.dto";
import { GetFilesDto } from "../dtos/get-files.dto";
import { DeleteFileDto } from "../dtos/delete-file.dto";
export declare class FilesService {
    private filesRepository;
    private fsService;
    constructor(filesRepository: typeof File, fsService: FsService);
    createDir(dto: FileDto): Promise<File>;
    uploadFile(file: Express.Multer.File, dto: FileDto): Promise<File>;
    getFiles(dto: GetFilesDto): Promise<File[]>;
    deleteFile(dto: DeleteFileDto): Promise<File>;
    downloadFile(fileId: number): Promise<import("fs").ReadStream>;
}
