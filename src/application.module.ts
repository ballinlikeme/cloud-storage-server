import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { AuthModule } from "./auth/auth.module";
import { FsModule } from "./fs/fs.module";
import { FilesModule } from "./files/files.module";
import { File } from "./models/file.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, File],
      autoLoadModels: true,
    }),
    UserModule,
    AuthModule,
    FsModule,
    FilesModule,
  ],
  exports: [],
})
export class ApplicationModule {}
