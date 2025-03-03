import {Injectable} from '@nestjs/common';
import {CreateTagDto} from './dto/create-tag.dto';
import {UpdateTagDto} from './dto/update-tag.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Tags} from "../user/entities/tag.entity";
import {DeleteOptions, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository} from "typeorm";
import {User} from "../user/entities/user.entity";

@Injectable()
export class TagService {
    constructor(@InjectRepository(Tags) private readonly tagRep: Repository<Tags>,
                @InjectRepository(User) private readonly userRep: Repository<User>) {
    }

    create(createTagDto: CreateTagDto) {
        return 'This action adds a new tag';
    }

    /**
     * @desc:根据tags表，查找所有可能得tags名称
     * 请求：GET
     * url: /user/tags
     * 返回：
     * {
     *     code:200,
     *     data: [ { tags: 'Tag1' }, { tags: 'Tag2' }, { tags: 'Tag3' } ],
     *     msg: 'success'
     * }
     *
     *
     * */
    async findAll() {
        const res = await this.tagRep.createQueryBuilder()
            .select(["tags"])
            .groupBy("tags")
            .orderBy({"tags": "ASC"})
            .getRawMany();
        console.log("res===", res);
        return res;
    }

    async findOne(id: number) {
        // 根据用户id查询tags列表
        return this.tagRep.find({
            where: {
                user: {
                    id: id
                }
            }
        } as FindManyOptions);
    }

    async update(id: number, updateTagDto: UpdateTagDto) {
        // 根据用户id,获取当前用户更改前的tags列表
        const tag1 = await this.findOne(id);
        console.log("tag1===", tag1)
        if (tag1.length) {// 当前user_id下已经有tag标签，先删除
            await this.remove(id);
        }
        // 传入的数据是['Tag1','Tag2']
        // 定义传入的数据，是['Tag1','Tag2']生成的数组
        let newTag: Tags[] = [];
        // 传入的参数不为空时，为空给一个空数组即可
        if (updateTagDto.tags?.length) {
            for (const tag of updateTagDto.tags) {
                const tagInstance = new Tags();
                tagInstance.tags = tag;
                await this.tagRep.save(tagInstance);
                newTag.push(tagInstance);
            }
        }
        // 根据 user_id,获取当前记录；得到一个user实例
        const user = await this.userRep.findOne({
            where: {
                id: id
            }
        });
        user!.tags = newTag;
        user!.label = JSON.stringify(newTag);
        // user的tags(关联表)、label(标签)字段，以外的其他字段也需要查询出来

        return this.userRep.save(user!);
    }

    remove(id: number) {// 根据user_id删除tag
        return this.tagRep.delete({
            user: {
                id: id
            }
        } as FindOptionsWhere<Tags>);
    }

    // 根据tag自己的id，删除tag标签
    // 当时为了同步label字段，user的id也需要传递

    async removeTags(id: number, tagId: number) {
        // 删除tags表中该tagId对应记录
        const res = await this.tagRep.delete(tagId);
        // 重新查询该行数据
        const user = await this.userRep.findOne({
            where: {
                id: id
            },
            relations: {tags: true}
        } as FindOneOptions);
        // 根据findOne方法查询，该用户id下，tags表中记录
        let newTag: Tags[] = [];
        newTag = await this.findOne(id);
        user!.tags = newTag;
        user!.label = JSON.stringify(newTag);
        return this.userRep.save(user!);

    }
}
