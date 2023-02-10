"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const files_service_1 = require("../files/files.service");
const fs_service_1 = require("../fs/fs.service");
let AuthService = class AuthService {
    constructor(filesService, userService, jwtService, fsService) {
        this.filesService = filesService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.fsService = fsService;
    }
    async login(dto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) {
            throw new common_1.HttpException("Пользователь с таким email не найден", common_1.HttpStatus.BAD_REQUEST);
        }
        const isEqual = await bcrypt.compare(dto.password, user.password);
        if (!isEqual) {
            throw new common_1.HttpException("Неверный пароль", common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.generateToken(user);
    }
    async registration(dto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new common_1.HttpException("Пользователь с таким email уже существует", common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.create(Object.assign(Object.assign({}, dto), { password: hashedPassword }));
        await this.fsService.createDir(user.id);
        return this.generateToken(user);
    }
    async check(token) {
        try {
            return await this.jwtService.verify(token);
        }
        catch (e) {
            throw new common_1.HttpException("Invalid token", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        user_service_1.UserService,
        jwt_1.JwtService,
        fs_service_1.FsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map