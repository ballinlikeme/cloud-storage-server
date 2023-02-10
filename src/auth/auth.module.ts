import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import {FilesModule} from "../files/files.module";
import {FsModule} from "../fs/fs.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    FsModule,
    UserModule,
    FilesModule,
    JwtModule.register({
      secret: process.env.SECRET || "SECRET_KEY_321",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
})
export class AuthModule {}
