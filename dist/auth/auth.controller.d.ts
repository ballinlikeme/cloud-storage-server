import { AuthService } from "./auth.service";
import { UserDto } from "../dtos/user.dto";
import { UserLoginDto } from "../dtos/user-login.dto";
import { Request } from "express";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: UserLoginDto): Promise<{
        token: string;
    }>;
    registration(dto: UserDto): Promise<{
        token: string;
    }>;
    check(request: Request): Promise<any>;
}
