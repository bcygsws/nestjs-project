import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Tags} from "./tags.entity";

// 必须加上实体的装饰器
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    desc: string;
    @OneToMany(() => Tags, tags => tags.user)
    tags: Tags[];

}
