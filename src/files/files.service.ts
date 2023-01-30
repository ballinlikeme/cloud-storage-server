import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {File} from "../models/file.model";
import {FsService} from "../fs/fs.service";
import {FileDto} from "../dtos/file.dto";

@Injectable()
export class FilesService {

    constructor(@InjectModel(File)
                private filesRepository: typeof File,
                private fsService: FsService) {
    }

    async createDir(dto: FileDto) {
        const file = await this.filesRepository.create(dto)
        const parentFile = await this.filesRepository.findOne({where: {id: file.parentId}})
        if (!parentFile) {
            file.path = dto.name
            await this.fsService.createDir(file)
        } else {
            file.path = `${parentFile.path}\\${file.name}`
            await this.fsService.createDir(file)
            parentFile.children.push(file.id)
            await parentFile.save()
        }
        await file.save()
        return file
    }
}
