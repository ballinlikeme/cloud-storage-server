import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt"
import {UserDto} from "../dtos/user.dto";
import {UserLoginDto} from "../dtos/user-login.dto";
import * as bcrypt from "bcryptjs"
import {User} from "../models/user.model";

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService) {
    }

    async login(dto: UserLoginDto) {
        const user = await this.userService.getUserByEmail(dto.email)
        if (!user) {
            throw new HttpException('Пользователь с таким email не найден', HttpStatus.BAD_REQUEST)
        }
        const isEqual = await bcrypt.compare(dto.password, user.password)
        if (!isEqual) {
            throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED)
        }
        return this.generateToken(user)
    }

    async registration(dto: UserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.userService.create({...dto, password: hashedPassword})
        // await this.filesService.createDir({name: ``, userId: user.id, path: '', parentId: null})
        return this.generateToken(user)
    }

    async check(token: string) {
        try {
            return await this.jwtService.verify(token)
        } catch (e) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
        }
    }

    private generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
