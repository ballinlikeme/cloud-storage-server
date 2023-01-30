import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {UserDto} from "../dtos/user.dto";
import {UserService} from "./user.service";
import {Request} from "express";

@Controller('/users')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Post()
    create(@Body() dto: UserDto) {
        return this.userService.create(dto)
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

    @Get()
    getUserByEmail(@Req() request: Request) {
        const {email} = request.query
        return this.userService.getUserByEmail(String(email))
    }
}
