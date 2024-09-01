import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn} from 'typeorm';
import {Tags} from './tags.entity';

// 必须加上实体的装饰器
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: true})
    name: string;
    @Column({nullable: true})
    desc: string;
    // 要为其设置默认值，否则可能报错
    // @Column({type: "simple-array", nullable: true, select: false})
    @Column({type: 'simple-array', nullable: true})
    label: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Tags, (tags) => tags.user, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
        // tags: Tags[];
    tags: Relation<Tags>[];
}
