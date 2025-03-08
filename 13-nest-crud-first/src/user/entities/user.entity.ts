import {Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import {Profile} from "./profile.entity";
import {Role} from "./role.entity";
import {Log} from './log.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255})
    username: string;

    @Column({type: "varchar", length: 255})
    password: string;

    @OneToOne(type => Profile, profile => profile.user)
    profile: Profile;

    @OneToMany(type => Log, logs => logs.user)
    logs: Log[];


    @ManyToMany(type => Role, roles => roles.users)
    // 多对多的关系，始终依赖方向是user--->role；@JoinTable()类型注解，只能放在user实体类中
    // 注意1：放在role实体类中，将报错
    // 注意2: 默认生成的中间表名是：user_roles_role,name属性，设置一个更简洁的中间表名
    // 注意3：确认好，表中要有多少列和列名后，再启动项目；不但修改列名称会导致已添加进该表的数据丢失
    @JoinTable({name: 'user_role'})
    roles: Role[];


}
