import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {JwtModule} from "@nestjs/jwt"
import {User} from "../models/user.model";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
      JwtModule.register({
          secret: process.env.SECRET,
          signOptions: {
              expiresIn: '24h'
          }
      }),
      SequelizeModule.forFeature([User]),
  ],
  exports: [
      UserService
  ]
})
export class UserModule {}
