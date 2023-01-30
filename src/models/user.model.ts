import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";

interface UserCreationAttrs {
    email: string;
    name: string;
    password: string;
    imageUrl?: string;
}

@Table({tableName: "user"})
export class User extends Model<User, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    imageUrl: string;
}