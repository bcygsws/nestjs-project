import {Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, unique: true, nullable: false, default: 'admin'})
    name: string;


    @Column({type: 'varchar', nullable: false, default: '123456'})
    password: string;

    @CreateDateColumn({type: 'timestamp'})// 创建时间
    create_time: Date

    @Generated('uuid')// 自动生成列
    uuid: string;

    @Column({type: 'enum', enum: ['admin', 'user'], default: 'user'})// 枚举列
    xxx: string;

    @Column({type: 'simple-array'})// 简单数组列；将原始数组中每个元素存储在单个字符串列中
    array: string[];

    @Column({type: 'simple-json'})// 简单json列；将原始json对象存储在单个字符串列中
    json: { name: string, age: number };

}
