import {Injectable} from '@nestjs/common';
import {CreateEnvDto} from './dto/create-env.dto';
import {UpdateEnvDto} from './dto/update-env.dto';
// 在app.module中已经设置ConfigModule模块为全局，此处直接从包@nestjs/config中引入ConfigService即可
import {ConfigService} from "@nestjs/config";
import {ConfigEnum} from "../enum/env.enum";

@Injectable()
export class EnvService {
    constructor(private readonly configService: ConfigService) {
    }

    create(createEnvDto: CreateEnvDto) {
        return 'This action adds a new env';
    }

    findAll() {
        // console.log(this.configService.get('DB_USER'));
        // console.log(this.configService.get('DB_PASSWORD'));

        // 使用enum/引入get中的变量，而不是直接写字符串，可能会出错
        // console.log(this.configService.get(ConfigEnum.DB_USER));
        // console.log(this.configService.get(ConfigEnum.DB_PASSWORD));
        // console.log(this.configService.get(ConfigEnum.DB_URL));

        // yaml文件配置读取
        console.log(this.configService.get('db'));
        return `This action returns all env`;
    }

    findOne(id: number) {
        return `This action returns a #${id} env`;
    }

    update(id: number, updateEnvDto: UpdateEnvDto) {
        return `This action updates a #${id} env`;
    }

    remove(id: number) {
        return `This action removes a #${id} env`;
    }
}
