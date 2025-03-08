import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    method: string;

    @Column()
    data: string;

    @Column()// result：返回一个状态码，number类型
    result: number;

    @ManyToOne(type => User, user => user.logs)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;


}