import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserGuard} from "./user.guard";
import {Role} from "./user.decorator";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

// ApiProperty()为post请求参数设置描述信息，在dto中

@Controller('user')
@UseGuards(UserGuard)
@ApiTags('守卫接口')// 为接口设置分组名称
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @Role('admin')
    @ApiOperation({summary: '用户权限控制', description: '详情xxxxxxxx'})// 为某个接口设置描述信息
    @ApiQuery({name: 'page', required: true, description: '分页'})// 为请求参数设置描述信息
    @ApiResponse({status: 403, description: '返回用户列表'})
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiParam({name: 'id', required: true, description: '用户id'})// 为接口参数设置描述信息
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
