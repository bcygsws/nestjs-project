import {Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import * as uuid from 'uuid';

// 生成一个随机uuid,在控制台拿到，作为请求参数
console.log(uuid.v4());// 复制了一个uuid值：adfdf525-d38b-4b56-b03b-8f3c93bed91b 用作动态参数:id


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        // string
        console.log("id类型：=====", typeof id);
        // 测试步骤：
        // 1.若将路径参数id,限制为uuid类型(在@Param装饰器中添加第二参数)；仍然使用http://localhost:3000/user/123访问
        // 2.http请求过滤器拦截它，返回错误：{"data":"Validation failed (uuid is expected)","time":"2024-08-25T22:25:15.378Z","success":false,"path":"/user/123","status":400}
        // 3.安装@types/uuid 和 uuid包，并引入
        // 4.在控制台中，拿到后，复制用作动态参数id;即：http://localhost:3000/user/adfdf525-d38b-4b56-b03b-8f3c93bed91b
        // 5.请求就能发送成功：{"data":"This action returns a #NaN user","code":200,"message":"请求成功","success":true}
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
