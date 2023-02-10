import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";

interface FileCreationAttrs {
  name: string;
  type: string;
  path: string;
  userId: number;
  parentId: number;
}

@Table({ tableName: "file" })
export class File extends Model<File, FileCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  size: number;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  path: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => File)
  @Column({ type: DataType.INTEGER})
  parentId: number;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), defaultValue: [] })
  children: number[];

  @BelongsTo(() => User)
  owner: User;
}
