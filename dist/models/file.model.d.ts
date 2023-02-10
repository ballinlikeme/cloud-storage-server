import { Model } from "sequelize-typescript";
import { User } from "./user.model";
interface FileCreationAttrs {
    name: string;
    type: string;
    path: string;
    userId: number;
    parentId: number;
}
export declare class File extends Model<File, FileCreationAttrs> {
    id: number;
    name: string;
    size: number;
    type: string;
    path: string;
    userId: number;
    parentId: number;
    children: number[];
    owner: User;
}
export {};
