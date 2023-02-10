import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FilesService } from "./files.service";
import { FileDto } from "../dtos/file.dto";
import {Request, Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {DeleteFileDto} from "../dtos/delete-file.dto";
import {createReadStream, readFileSync} from "fs";
import {join} from "path"

@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post("/createDir")
  createDir(@Body() dto: FileDto) {
    console.log(dto);
    return this.filesService.createDir(dto);
  }

  @Get()
  getFiles(@Req() request: Request) {
    const {userId, parentId} = request.query
    return this.filesService.getFiles({userId: Number(userId), parentId: Number(parentId) || null} )
  }

  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File,
             @Body() dto: FileDto
             ) {
    return this.filesService.uploadFile(file, dto)
  }

  @Delete('/deleteFile')
  deleteFile(@Body() dto: DeleteFileDto) {
    console.log(dto)
    return this.filesService.deleteFile(dto)
  }

  @Get('/downloadFile')
  async downloadFile(@Req() request: Request,
               @Res() response: Response){
    const {fileId} = request.query
    const file = await this.filesService.downloadFile(Number(fileId))
    // const file = createReadStream(join(process.cwd(), 'package.json'))
    // return response.download(`${process.env.FILES_STORAGE_PATH}\\5\\White App Logo.svg`, "file.svg")
    return file.pipe(response)
  }
}
