import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
@Entity()
export class Main {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    money: number;

}

