import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata} from '@nestjs/common';
import {GuardService} from './guard.service';
import {CreateGuardDto} from './dto/create-guard.dto';
import {UpdateGuardDto} from './dto/update-guard.dto';
import {RoleGuard} from "./role/role.guard";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('guard模块接口')
// 这样局部守卫RoleGuard就生效了
@Controller('guard')
@UseGuards(RoleGuard)
export class GuardController {
    constructor(private readonly guardService: GuardService) {
    }

    @Post()
    create(@Body() createGuardDto: CreateGuardDto) {
        return this.guardService.create(createGuardDto);
    }

    /**
     * @name: SetMetadata()
     * @description:顾名思义，设置元数据（vue路由文件中，也配置metadata）
     * role是键，值为['admin']
     * 1.为接口设置元数据后，访问接口时，必须带上?role=admin，否则接口将被守卫拦截
     * 2.
     *
     *
     *
     * */
    @Get()
    @SetMetadata('role', ['admin'])
    findAll() {
        return this.guardService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.guardService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
        return this.guardService.update(+id, updateGuardDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.guardService.remove(+id);
    }
}
