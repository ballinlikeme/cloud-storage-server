import {Injectable} from '@nestjs/common';
import {UserDto} from "../dtos/user.dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../models/user.model";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async create(dto: UserDto) {
        return await this.userRepository.create(dto)
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({where: {email}})
    }

    async getAllUsers() {
        return await this.userRepository.findAll({include: {all: true}})
    }

}
