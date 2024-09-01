import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, Relation,
} from 'typeorm';
import { User } from './user.entity';

// 必须加上实体的装饰器
@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  tags: string;

  // 关联时，两种写法：user: User;另外一种：user: Relation<User>
  @ManyToOne(() => User, (user) => user.tags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  // 如果不指定name值，生成的默认列名是userId,这种驼峰格式
  @JoinColumn({ name: 'user_id',referencedColumnName: 'id' })
  // user: User;
  user: Relation<User>;
}
