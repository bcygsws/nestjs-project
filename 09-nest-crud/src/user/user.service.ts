import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {FindManyOptions, Like, Repository} from 'typeorm';
import {Tags} from './entities/tags.entity';
import {UpdateTagsDto} from './dto/update-tags.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>,
        @InjectRepository(Tags) private readonly tag_tb: Repository<Tags>,
    ) {
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
            // select关键字，设定只查询部分字段
            // 第一种方式，使用select关键字
            select: ['id', 'name', 'desc', 'createdAt', 'updatedAt'],

            // 第二种方式，label关键字，实体类字段中设置 select:false;查询结果，也实现过滤掉了label字段
            where: {
                name: Like(`%${keywords}%`),
            },
            order: {
                id: 'DESC',
            },
            take: pageSize,
            skip: pageSize * (page - 1),
            relations: ['tags'],
        });
        // 2.统计匹配模糊查询条件的总数
        const total = await this.user.count({
            where: {
                name: Like(`%${keywords}%`),
            },
        });
        console.log('faaaw', list);

        // list.map(item => {
        //         if (!item['label']) {
        //             item['label'] = JSON.parse('[]');
        //         } else {
        //             item['label'] = JSON.parse(item['label']);
        //         }
        //     }
        // )
        return {
            list,
            total,
        };
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

    async addTags(bodyInfo: { userId: number; tags: string[] }) {
        console.log(bodyInfo);
        // 1.根据id,在user表中，查出这条记录的信息
        const userInfo = await this.user.findOne({
            where: {
                id: bodyInfo.userId,
            },
        });
        console.log('--', userInfo);
        /**
         *@name:灵活的createQueryBuilder方法
         *@description:
         * 参考文档：https://typeorm.bootcss.com/select-query-builder
         *
         * 当两个表中的列做了关联以后，操作该列需要特别小心；常有错误提示，找不到主键的列
         * 为此，可以从表创建user_id列，不做关联；在做表的联查时，就不会出错了
         * 参考：https://juejin.cn/post/7330933094159810612
         *
         * 1.使用getConnection().createQueryBuilder().select(Tags)方法，已经废弃
         * 2.getManager().createQueryBuilder(Tags,'tag_db')这两种方式已经废弃
         *
         * 3.getRepository(Tags).createQueryBuilder('tags')仍然保留
         * 注：tags是别名
         *
         *
         * */

        // 每次存取userId的tags时，先删除该userId下添加了所有记录行
        // where子句中条件tags.user_Id= :id 冒号前的空格不能少，否则报错

        await this.tag_tb
            .createQueryBuilder('tags')
            .delete()
            .where('tags.user_id= :id', {
                id: bodyInfo.userId,
            })
            .execute();

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
        console.log('--->', userInfo.label);
        console.log('--->', userInfo);
        // 将userInfo存入user表
        await this.user.save(userInfo);
        /**
         * 联表查询
         * 1.leftJoinAndSelect()添加select关键字，查询部分字段
         *
         * 二者一个单词的差距，但是含义不同；MapOne只会返回user.tags中的一条记录，然后MapMany会返回user.tags中的多条记录
         * 2.leftJoinAndMapOne()，可以实现对返回数据细粒度的控制
         * 3.leftJoinAndMapMany()，可以实现对返回数据细粒度的控制
         *
         * 和Prisma的对比：
         * 参考：https://juejin.cn/post/7323203806794498082?from=search-suggest
         *
         *
         *
         * */
            // 1.leftJoinAndSelect()添加select关键字，查询部分字段---返回标准的列
        const result = await this.user.createQueryBuilder('user').select(['user.id', 'user.name', 'user.desc']).leftJoinAndSelect("user.tags", "tags", "tags.user_id=user.id").getMany();

        // 2.leftJoinAndMap()，可以实现对返回数据细粒度的控制,不查询某些字段，可以在实体定义中，设置{select:false}
        // const result = await this.user.createQueryBuilder('account')
        //         .leftJoinAndMapMany("account.tags", Tags, "tags", "account.id=tags.user_id")
        //         .getMany();
        //     const result = await this.user.createQueryBuilder('user')
        //         .select(['user.id', 'user.name', 'user.desc'])
        //         .leftJoinAndMapMany("user.tags",qb=>{
        //             return qb.subQuery().select(['id','user_id']).from(Tags,"tags");
        //         },"tags", "tags.user_id=user.id")
        //         .getMany();
        console.log("result", result);

        return `成功添加标签！`;
    }

    /**
     * @name:delTag方法
     * @description:根据tagId和userId，在tags表中删除记录
     * 访问：localhost:3000/
     *
     * 1.注意：主表和从表的级联更新和级联删除；主表完全影响从表；
     * 但从表并不能完全影响主表
     * 2.根据tagId删除了从表-tags中该tagId的记录行
     * 两种方式：
     * a.查询构建器方式：
     * where('tags.user_id= :id', {id: userId})
     *
     * b.find方法
     * find(
     * {
     *      where: {
     *          user: {id: userId}
     *      }
     *  } as FindManyOptions<Tags>
     *  )
     *
     * */
    async delTag(userId: number, tagId: number) {
        await this.tag_tb.delete(tagId);
        // const tagList = await this.tag_tb
        //     .createQueryBuilder('tags')
        //     .where('tags.user_id= :id', {id: userId})
        //     .getMany();

        const tagList = await this.tag_tb.find({
                where: {
                    user: {id: userId}
                }
            } as FindManyOptions<Tags>
        );


        /**
         * 1.传入的实体，updateTagsDto，可以是@Body的参数中获取
         * 2.也可以自己按照实体的字段和类型，自己拼接
         * 3.以上，两种都用的是数据映射到实体中
         *
         * */
        // 1.将tagList转为json字符串，存入数据库中
        console.log(tagList);
        await this.updateTag(userId, {label: JSON.stringify(tagList)});

        console.log('tagList===', tagList);
        return `成功删除一个tag标签！`;
    }

    async updateTag(userId: number, updateTagsDto: UpdateTagsDto) {
        await this.user.update(userId, updateTagsDto);
    }
}
