import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { FsModule } from "../fs/fs.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { File } from "../models/file.model";

@Module({
  providers: [FilesService],
  controllers: [FilesController],
  imports: [SequelizeModule.forFeature([File]), FsModule],
  exports: [FilesService]
})
export class FilesModule {}
