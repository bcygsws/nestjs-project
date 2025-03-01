import {Injectable} from '@nestjs/common';
import {CreateTagDto} from './dto/create-tag.dto';
import {UpdateTagDto} from './dto/update-tag.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Tags} from "../user/entities/tag.entity";
import {Repository} from "typeorm";

@Injectable()
export class TagService {
    constructor(@InjectRepository(Tags) private readonly tagRep: Repository<Tags>) {
    }

    create(createTagDto: CreateTagDto) {
        return 'This action adds a new tag';
    }

    async findAll() {
        const res = await this.tagRep.createQueryBuilder()
            .select(["tags"])
            .groupBy("tags")
            .orderBy({"tags": "ASC"})
            .getRawMany();
        console.log("res===", res);
        return res;
    }

    findOne(id: number) {
        return `This action returns a #${id} tag`;
    }

    update(id: number, updateTagDto: UpdateTagDto) {
        return `This action updates a #${id} tag`;
    }

    remove(id: number) {
        return `This action removes a #${id} tag`;
    }
}
