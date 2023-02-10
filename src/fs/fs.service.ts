import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import { FileDto } from "../dtos/file.dto";
import { readFileSync } from "fs";
import * as archiver from "archiver"
import { join } from 'path';

@Injectable()
export class FsService {
  createDir(userId: number, path?: string) {

    let filePath = ''

    if (path) {
      filePath = `${process.env.FILES_STORAGE_PATH}\\${userId}\\${path}`;
    } else {
      filePath = `${process.env.FILES_STORAGE_PATH}\\${userId}`;
    }

    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      } else {
        throw new HttpException('File already exists', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  createFile(file: Express.Multer.File, dto: FileDto, path: string) {
    const filePath = `${process.env.FILES_STORAGE_PATH}\\${dto.userId}\\${path}`;
    try {
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, file.buffer);
      } else {
        throw new HttpException('File already exists', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  deleteFile(path: string, userId: number, type: string) {
    const filePath = `${process.env.FILES_STORAGE_PATH}\\${userId}\\${path}.${type}`
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      } else {
        throw new HttpException('File does not exist', HttpStatus.BAD_REQUEST)
      }
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }

  deleteDir(path: string, userId: number) {
    const filePath = `${process.env.FILES_STORAGE_PATH}\\${userId}\\${path}`
    try {
      if (fs.existsSync(filePath)) {
        fs.rmdirSync(filePath, { recursive: true })
      } else {
        throw new HttpException('Folder does not exist', HttpStatus.BAD_REQUEST)
      }
    } catch (e) {
      throw new HttpException(e.message, e.status)
    }
  }

  downloadFile(path: string, userId: number, type: string) {
    const filePath = `${process.env.FILES_STORAGE_PATH}\\${userId}\\${path}.${type}`
    const file = readFileSync(filePath)
    return file
  }


}
