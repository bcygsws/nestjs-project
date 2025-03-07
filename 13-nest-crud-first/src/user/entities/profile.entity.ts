import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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

}