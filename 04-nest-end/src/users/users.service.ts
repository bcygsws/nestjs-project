import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/auth.entity";
// 该模块在users.module中导出，在其他模块中使用

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private readonly user_tb: Repository<User>) {
    }

    async doUnameMatch(username: string) {
        // 注意：这里的find方法，不用findOne，findOne返回的是对象；而find是返回数组
        const adminList = await this.user_tb.find({where: {username: username}});
        console.log(adminList);
        // 数组的find方法，满足添加的那个元素
        return adminList.find(user => user.username === username)

    }

}

