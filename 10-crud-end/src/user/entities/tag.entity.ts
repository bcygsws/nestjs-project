import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    tags: string;


    @ManyToOne(() => User, (user) => user.tags)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;


}