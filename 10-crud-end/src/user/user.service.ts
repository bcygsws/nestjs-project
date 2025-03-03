import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {FindManyOptions, FindOneOptions, ILike, Like, Repository} from "typeorm";
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
                id: 'DESC'
            },
            skip: pageSize * (page - 1),
            take: pageSize,
            relations: ['tags'],
        } as FindManyOptions);
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

    /**
     * @desc:TypeOrm
     * 参考文档 ：https://juejin.cn/post/7323203806794498082?from=search-suggest
     * bug:使用id为null的查询，不会报错，返回了查询表中第一条数据

     * findOne({
     *     where: {
     *         id:null
     *     }
     * })
     *
     *
     * */
    async findOne(id: number) {
        const res = await this.user.findOne({
            where: {
                id: null
            },
            relations: ['tags']
        } as FindOneOptions);
        console.log("res===", res);// 返回的结果不是null，而是user表第一条数据
        return res;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const res = await this.user.update(id, updateUserDto);
        console.log("update res", res);
        return res;
    }

    async remove(id: number) {
        // 一般不适用delete方法硬删除， 而是使用remove方法软删除
        const res = await this.user.delete(id);
        console.log("remove res", res);
        return res;
    }
}
