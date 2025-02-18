import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ManagerService} from './manager.service';
import {CreateManagerDto, TransferMoneyDto} from './dto/create-manager.dto';
import {UpdateManagerDto} from './dto/update-manager.dto';
import {Transaction} from "typeorm";
import {Manager} from "./entities/manager.entity";

@Controller('manager')
export class ManagerController {
    constructor(private readonly managerService: ManagerService) {
    }

    /**
     * @转账请求，定义一个post请求
     * localhost:3000/manager/transfer
     * post请求
     * body参数
     * TransferMoneyDto类中定义
     *
     *
     * */
    @Post('transfer')
    async transfer(@Body() transferMoneyDto: TransferMoneyDto) {
        return this.managerService.transfer(transferMoneyDto);
    }


    @Post()
    create(@Body() createManagerDto: CreateManagerDto) {
        return this.managerService.create(createManagerDto);
    }

    @Get()
    findAll() {
        return this.managerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.managerService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
        return this.managerService.update(+id, updateManagerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.managerService.remove(+id);
    }
}
