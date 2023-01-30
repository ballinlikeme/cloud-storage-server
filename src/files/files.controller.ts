import {Body, Controller, Post} from '@nestjs/common';
import {FilesService} from "./files.service";
import {FileDto} from "../dtos/file.dto";

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) {
    }

    @Post('/createDir')
    createDir(@Body() dto: FileDto) {
        console.log(dto)
        return this.filesService.createDir(dto)
    }

    @Post('/uploadFile')
    uploadFile(@Body() dto: FileDto) {

    }
}
