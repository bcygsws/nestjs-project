import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

/**
 * @name:
 * @desc:定义实体类
 *
 * */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    // 用户名一般是唯一的，{unique:true}设置唯一约束
    @Column({unique: true})
    username: string;
    @Column()
    password: string;
    @Column()
    token: string;
}
