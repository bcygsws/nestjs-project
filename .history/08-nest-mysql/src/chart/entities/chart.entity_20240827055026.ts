import { Entity } from "typeorm";

// 把类装饰成实体类
@Entity()
export class Chart {
  @Ge
  id:number
  user:string
  password:string
  age:number

}
