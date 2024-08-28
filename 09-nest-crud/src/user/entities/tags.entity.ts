import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

// 必须加上实体的装饰器
@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    tags: string;
    @ManyToOne(() => User, user => user.tags)
    @JoinColumn()
    user: User;


}
