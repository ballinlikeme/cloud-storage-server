import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../dtos/user.dto";
import { UserLoginDto } from "../dtos/user-login.dto";
import { FilesService } from "../files/files.service";
import { FsService } from "../fs/fs.service";
export declare class AuthService {
    private filesService;
    private userService;
    private jwtService;
    private fsService;
    constructor(filesService: FilesService, userService: UserService, jwtService: JwtService, fsService: FsService);
    login(dto: UserLoginDto): Promise<{
        token: string;
    }>;
    registration(dto: UserDto): Promise<{
        token: string;
    }>;
    check(token: string): Promise<any>;
    private generateToken;
}
