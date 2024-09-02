import {Injectable} from '@nestjs/common';
import {CreateMainDto, TransferMoneyDto} from './dto/create-main.dto';
import {UpdateMainDto} from './dto/update-main.dto';
import {DataSource} from "typeorm";
import {Main} from "./entities/main.entity";

/**
 * @name:使用DataSource全方位管理事务
 *
 *
 * */

@Injectable()
export class MainService {
    constructor(private dataSource: DataSource) {
    }

    async transfer(transferMoneyDto: TransferMoneyDto) {
        const {fromId, toId, money} = transferMoneyDto;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            /**
             *
             * @在service类，处理事务的三种方式：
             * 参考文档：
             * https://docs.nestjs.com/techniques/database#typeorm-transactions
             * 注：
             * 1.DataSource是@InjectRestRepository()之外另一种注入方式
             * 2.this.dataSource.getRepository(Main);  注入实体类
             * 之后 就可以链式操作，后面链式调用增删改查方法
             * 3.管理事务的三种方式：
             * main/main.service.ts中注释部分
             *
             *
             *
             * */
            const mainRepository = this.dataSource.getRepository(Main);
            const fromInfo = await mainRepository.findOne({where: {id: fromId}});
            console.log(fromInfo);
            const toInfo = await mainRepository.findOne({where: {id: toId}});
            console.log(toInfo);
            if (money > fromInfo.money) {
                return '余额不足';
            } else {
                // 1.方式一：使用queryRunner全程控制事务的管理
                await queryRunner.manager.save(Main, {id: fromId, money: fromInfo.money - money});
                await queryRunner.manager.save(Main, {id: toId, money: toInfo.money + money});
                await queryRunner.commitTransaction()

                // 2.若不全程控制,可以使用this.dataSource.transaction(async cb)提交事务
                // await this.dataSource.transaction(async (manager) => {
                //     // await manager.save()
                // })

                // 3.若使用装饰器@InjectRepository() money:Repository<Main> 注入实体类到当前Service类，
                // 同样可以类似方式二，使用回调函数处理事务
                // await this.money.manager.transaction(async (manager) => {
                //     // await manager.save()
                // });

                return '转账成功';
            }


        } catch (e) {
            // 回滚
            await queryRunner.rollbackTransaction();
            // throw e;
        } finally {
            await queryRunner.release();
        }
    }


    create(createMainDto: CreateMainDto) {
        return 'This action adds a new main';
    }

    findAll() {
        return `This action returns all main`;
    }

    findOne(id: number) {
        return `This action returns a #${id} main`;
    }

    update(id: number, updateMainDto: UpdateMainDto) {
        return `This action updates a #${id} main`;
    }

    remove(id: number) {
        return `This action removes a #${id} main`;
    }
}
