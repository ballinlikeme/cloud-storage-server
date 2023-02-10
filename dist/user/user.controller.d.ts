import { UserDto } from "../dtos/user.dto";
import { UserService } from "./user.service";
import { Request } from "express";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(dto: UserDto): Promise<import("../models/user.model").User>;
    getAll(): Promise<import("../models/user.model").User[]>;
    getUserByEmail(request: Request): Promise<import("../models/user.model").User>;
}
