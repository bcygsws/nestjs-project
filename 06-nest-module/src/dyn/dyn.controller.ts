import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import {DynService} from './dyn.service';
import {CreateDynDto} from './dto/create-dyn.dto';
import {UpdateDynDto} from './dto/update-dyn.dto';
import {ConfigService} from "../config/config.service";

@Controller('dyn')
export class DynController {
    // 当前dyn模块，使用config模块生成的动态模块
    constructor(private readonly dynService: DynService,
                @Inject('Config') private readonly val: { baseApi: string },
                private readonly configService: ConfigService) {

    }

    @Post()
    create(@Body() createDynDto: CreateDynDto) {
        return this.dynService.create(createDynDto);
    }

    // 访问：http://localhost:3000/dyn接口
    // 打印：
    // {"baseApi":"/api/deepseek"}
    @Get()
    findAll() {
        // return this.dynService.findAll();
        return Object.assign({}, this.val, this.configService.getConfig());
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.dynService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDynDto: UpdateDynDto) {
        return this.dynService.update(+id, updateDynDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.dynService.remove(+id);
    }
}
