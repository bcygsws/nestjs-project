import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ILike, Like, Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Tags} from "./entities/tag.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly user: Repository<User>,
                @InjectRepository(Tags) private readonly tags: Repository<Tags>) {
    }

    create(createUserDto: CreateUserDto) {
        const data = new User();
        data.name = createUserDto.name;
        data.desc = createUserDto.desc;
        // save方法：如果不存在，则添加；如果已经存在，save方法会更新数据
        return this.user.save(data);
    }

    // where or条件查询写法，参考：https://typeorm.nodejs.cn/find-options
    // 和Like关键字不同，ILike是不区分大小写的模糊比对
    async findAll(keywords: string, page: number, pageSize: number) {
        const list = await this.user.find({
            select: ['id', 'name', 'desc', 'createdAt', 'updatedAt'],// 没有包含label字段
            where: [// 模糊查询，name或者desc字段
                {name: Like(`%${keywords}%`)},
                {desc: Like(`%${keywords}%`)}
            ],
            order: {
                id: 'DESC',
            },
            skip: pageSize * (page - 1),
            take: pageSize,
            relations: ['tags'],
        });
        const total = await this.user.count({
            where: [
                {name: Like(`%${keywords}%`)},
                {desc: Like(`%${keywords}%`)}
            ]
        });
        return {
            list,
            total
        };
    }

    async findTags() {
        const res = await this.tags.createQueryBuilder("tag").select("tag.tags").groupBy("tags").getRawMany();
        console.log(res);
        return res;
    }

    findOne(id
                :
                number
    ) {
        return `This action returns a #${id} user`;
    }

    update(id
               :
               number, updateUserDto
               :
               UpdateUserDto
    ) {
        return `This action updates a #${id} user`;
    }

    remove(id
               :
               number
    ) {
        return `This action removes a #${id} user`;
    }
}
