import { Module } from "@nestjs/common";
import { FsService } from "./fs.service";
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from "../models/file.model";

@Module({
  providers: [FsService],
  exports: [FsService],
  imports: [SequelizeModule.forFeature([File])],
})
export class FsModule {}
