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
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    token: string;
}
