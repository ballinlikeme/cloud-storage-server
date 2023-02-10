import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "../dtos/user.dto";
import { UserLoginDto } from "../dtos/user-login.dto";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() dto: UserLoginDto) {
    return this.authService.login(dto);
  }

  @Post("/registration")
  registration(@Body() dto: UserDto) {
    return this.authService.registration(dto);
  }

  @Get("/check")
  check(@Req() request: Request) {
    const token = request.headers.authorization.split(" ")[1];
    return this.authService.check(token);
  }
}
