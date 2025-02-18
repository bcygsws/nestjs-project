import {Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn} from "typeorm";

// 把类装饰成实体类
@Entity()
export class Chart {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user: string

    // select设为true时，查询时，该列会被过滤掉；数据安全
    @Column({select: true, comment: '注释', default: '123', nullable: true})
    password: string

    @Column()
    age: number

    @Generated('uuid')
    uuid: string

    // 枚举类型
    @Column({type: 'enum', enum: [1, 2, 3], default: 1})
    xiaoman: number

    @CreateDateColumn({type: 'timestamp'}) //类型：时间戳
    createTime: Date

    @Column('simple-array')
    names: string[]

    // 等价于调用JSON.stringify()将数据存入数据库
    @Column('simple-json')
    json: { name: '张三', age: 18 }

}
