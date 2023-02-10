import { Model } from "sequelize-typescript";
interface UserCreationAttrs {
    email: string;
    name: string;
    password: string;
    imageUrl?: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    email: string;
    password: string;
    name: string;
    imageUrl: string;
}
export {};
