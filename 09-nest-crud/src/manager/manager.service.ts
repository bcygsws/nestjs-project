import {Injectable} from '@nestjs/common';
import {CreateManagerDto, TransferMoneyDto} from './dto/create-manager.dto';
import {UpdateManagerDto} from './dto/update-manager.dto';
import {Manager} from "./entities/manager.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, Transaction} from "typeorm";

@Injectable()
export class ManagerService {

    constructor(@InjectRepository(Manager) private readonly money: Repository<Manager>) {
    }

    /**
     * @事务
     * 1.使用apifox传入body参数{
     *     "fromId":1,
     *     "toId":2,
     *     "money":1000
     * }
     * 2.发送请求
     * localhost:3001/manager/transfer
     * 3.测试收到了body参数
     * { fromId: 1, toId: 2, money: 1000 }
     * 4.使用管理事务的manager.save()方法，保存事务
     * 5.可以使用两种方式：
     *  5.1 在控制层不使用装饰器
     *  5.2 在控制层使用装饰器
     *
     * */
    async transfer(transferMoneyDto: TransferMoneyDto) {
        console.log(transferMoneyDto);
        try {
            return await this.money.manager.transaction(async (manager) => {
                const {fromId, toId, money} = transferMoneyDto;
                const fromInfo = await this.money.findOne({where: {id: fromId}});
                console.log('转账前--->', fromInfo);
                const toInfo = await this.money.findOne({where: {id: toId}});
                console.log('转账前--->', toInfo);
                // 先要判断主动转账者 的余额是否足够转账金额
                if (money > fromInfo.money) {
                    // 余额不够了，就不适用manager处理数据库里的数据
                    return '余额不足';
                } else {// 余额足够
                    await manager.save(Manager, {id: fromId, money: fromInfo.money - money});
                    await manager.save(Manager, {id: toId, money: toInfo.money + money});
                    return '转账成功';

                }


            })
        } catch (e) {
            throw new Error(e);
        }
    }



    create(createManagerDto: CreateManagerDto) {
        return 'This action adds a new manager';
    }

    findAll() {
        return `This action returns all manager`;
    }

    findOne(id: number) {
        return `This action returns a #${id} manager`;
    }

    update(id: number, updateManagerDto: UpdateManagerDto) {
        return `This action updates a #${id} manager`;
    }

    remove(id: number) {
        return `This action removes a #${id} manager`;
    }
}
