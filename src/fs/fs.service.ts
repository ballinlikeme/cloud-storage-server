import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from "fs"
import {File} from "../models/file.model";

@Injectable()
export class FsService {

    createDir(file: File) {
        const filePath = `${process.env.FILES_STORAGE_PATH}\\${file.userId}\\${file.path}`
        try {
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            } else {
                throw new HttpException('File already exists', HttpStatus.BAD_REQUEST)
            }
        }
        catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }
}
