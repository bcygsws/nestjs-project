import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() // 0: male, 1: female
    gender: number;

    @Column()
    photo: string;

    @Column()
    address: string;

    @OneToOne(type => User, user => user.profile)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: User;

}