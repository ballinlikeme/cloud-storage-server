import { UserDto } from "../dtos/user.dto";
import { User } from "../models/user.model";
export declare class UserService {
    private userRepository;
    constructor(userRepository: typeof User);
    create(dto: UserDto): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
