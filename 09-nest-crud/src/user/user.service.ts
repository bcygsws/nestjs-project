import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Like, Repository} from "typeorm";
import {Tags} from "./entities/tags.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly user: Repository<User>,
                @InjectRepository(Tags) private readonly tag_tb: Repository<Tags>) {
    }

    /**
     * @name:create方法
     * @description:新增一条记录
     * 从controller文件中，获悉creatUserDto里存的就是body参数对象
     *
     * */
    async create(createUserDto: CreateUserDto) {
        // 实例化User实体类
        // 保存数据到user对象，typeorm映射到数据库
        const data = new User();
        data.name = createUserDto.name;
        data.desc = createUserDto.desc;
        return this.user.save(data);
    }

    async findAll(keywords: string, page: number, pageSize: number) {
        // 根据名称name字段的模糊查询
        // 1.在此基础上分页
        const list = await this.user.find({
            relations: ['tags'],
            where: {
                name: Like(`%${keywords}%`)
            },
            order: {
                id: 'DESC'
            },
            take: pageSize,
            skip: pageSize * (page - 1)
        });
        // 2.统计匹配模糊查询条件的总数
        const total = await this.user.count({
            where: {
                name: Like(`%${keywords}%`)
            }
        })
        console.log("faaaw", list);
        // if (!list['label']) {
        //     list['label'] = [];
        // } else {
        //     list['label'] = JSON.parse(list['label'][0]);
        // }
        list.map(item => {
                if (!item['label']) {
                    item['label'] = JSON.parse('[]');
                } else {
                    item['label'] = JSON.parse(item['label']);
                }
            }
        )
        return {
            list,
            total
        }
    }

    async findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return this.user.update(id, updateUserDto);
    }

    async remove(id: number) {
        return this.user.delete(id);
    }

    /**
     * @name:addTags方法
     * @description:将tags存入数据库，并添加到user表的标签中
     *
     * */

    async addTags(bodyInfo: { userId: number, tags: string[] }) {
        console.log(bodyInfo);
        // 1.根据id,在user表中，查出这条记录的信息
        const userInfo = await this.user.findOne({
            where: {
                id: bodyInfo.userId
            }
        });
        console.log("--", userInfo);
        /**
         *@name:灵活的createQueryBuilder方法
         *@description:参考文档：https://typeorm.bootcss.com/select-query-builder
         * 1.使用getConnection().createQueryBuilder().select(Tags)方法，已经废弃
         * 2.getManager().createQueryBuilder(Tags,'tag_db')这两种方式已经废弃
         *
         * 3.getRepository(Tags).createQueryBuilder('tags')仍然保留
         * 注：tags是别名
         *
         *
         * */

        // 每次存取userId的tags时，先删除该userId下添加了所有记录行

        await this.tag_tb.createQueryBuilder('tags').delete().where('tags.userId = :id', {
            id: bodyInfo.userId
        }).execute();

        // 2.将前端传过来的参数tags数组，存入tags表，同时根据useId组成数组
        const tagList: Tags[] = [];
        // 从Tags实体中，获取实例
        for (const tag of bodyInfo.tags) {
            // 每次都要创建新的记录行数据，该实例化，放在循环体内
            const my_tag = new Tags();
            my_tag.tags = tag;
            // 将当前tag标签，名字为tags存入tags表
            await this.tag_tb.save(my_tag);
            // 将该条记录，也存入数组
            tagList.push(my_tag);
        }
        // 3.已经完成将多条tags表记录存入数据库，同时存入数组tagList,并添加到当前userInfo的tags键上
        userInfo.tags = tagList;
        userInfo.label = JSON.stringify(tagList);
        console.log("--->", userInfo.label);
        console.log("--->", userInfo);
        // 将userInfo存入user表
        return this.user.save(userInfo);
    }

    /**
     * @name:delTag方法
     * @description:根据tagId和userId，在tags表中删除记录
     * 访问：localhost:3000/
     *
     * */
    async delTag(tagId: number) {
        await this.tag_tb.delete(tagId);

    }
}
