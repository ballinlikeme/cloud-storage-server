import { Injectable, StreamableFile } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { File } from "../models/file.model";
import { FsService } from "../fs/fs.service";
import { FileDto } from "../dtos/file.dto";
import { GetFilesDto } from "../dtos/get-files.dto";
import { DeleteFileDto } from "../dtos/delete-file.dto";
import { createReadStream, readFileSync } from "fs";

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File)
    private filesRepository: typeof File,
    private fsService: FsService
  ) { }

  async createDir(dto: FileDto) {
    const parentFile = await this.filesRepository.findOne({
      where: { id: dto.parentId },
    });
    if (parentFile) {
      const path = `${parentFile.path}\\${dto.name}`
      await this.fsService.createDir(dto.userId, path)
      const file = await this.filesRepository.create(dto);
      file.path = path
      parentFile.children.push(file.id);
      await parentFile.save();
      await file.save();
      return file;
    } else {
      const path = dto.name;
      await this.fsService.createDir(dto.userId, path)
      const file = await this.filesRepository.create(dto);
      file.path = dto.name;
      await file.save();
      return file;
    }
  }

  async uploadFile(file: Express.Multer.File, dto: FileDto) {

    let parentFile = null

    if (dto.parentId) {
      parentFile = await this.filesRepository.findOne({ where: { id: dto.parentId } })
    }

    if (parentFile) {
      const type = file.originalname.split('.').pop()
      const path = `${parentFile.path}\\${dto.name}.${type}`
      await this.fsService.createFile(file, dto, path)
      const newFile = await this.filesRepository.create(dto)
      newFile.path = path
      newFile.type = type
      newFile.size = file.size
      parentFile.size = parentFile.size + file.size
      parentFile.children.push(newFile.id)
      await newFile.save()
      await parentFile.save()
      return newFile
    } else {
      const type = file.originalname.split('.').pop()
      const path = `${dto.name}.${type}`
      await this.fsService.createFile(file, dto, path)
      const newFile = await this.filesRepository.create(dto)
      newFile.path = dto.name
      newFile.type = type
      newFile.size = file.size
      await newFile.save()
      return newFile
    }
  }

  async getFiles(dto: GetFilesDto) {
    const { userId, parentId } = dto
    return await this.filesRepository.findAll({ where: { userId, parentId } })
  }

  async deleteFile(dto: DeleteFileDto) {
    const file = await this.filesRepository.findOne({ where: { id: dto.fileId } })
    if (file.type === "dir") {
      await this.fsService.deleteDir(file.path, file.userId)
      if (file.children.length > 0) {
        const files = await this.filesRepository.findAll({ where: { parentId: file.id } })
        for (const oneFile of files) {
          await this.filesRepository.destroy({ where: { id: oneFile.id } })
        }
      }
    } else {
      await this.fsService.deleteFile(file.path, file.userId, file.type);
    }
    await this.filesRepository.destroy({ where: { id: dto.fileId } });
    return file
  }

  async downloadFile(fileId: number) {
    const file = await this.filesRepository.findOne({ where: { id: fileId } })
    const filePath = `${process.env.FILES_STORAGE_PATH}\\${file.userId}\\${file.name}.${file.type}`
    return createReadStream(filePath)
  }
}
