import {Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {DecGuard} from "./dec/dec.guard";
import {MyDecorator, MyURL} from "./decorator/decorator.decorator";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('user模块接口')
@Controller('user')
@UseGuards(DecGuard)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    /**
     * @元数据装饰器，来为路由添加元数据，使用守卫控制接口的访问
     * 1.生成守卫来获取元数据；根据是否和声明的元数据匹配，来控制接口的请求
     *
     *
     * 2.定义相关的守卫类
     * nest g gu user/dec
     * 将守卫类装饰器@UseGuards(DecGuard)注解到当前文件，使得守卫类生效
     *
     * 3.访问请求：http://localhost:3000/user?dec=user
     * 成功拿到了 dec---['user']
     * 4.书写canActive方法里的逻辑，通过返回true或者false,来控制http://localhost:3000/user路由的访问
     * 5.使用自定义装饰器decorator文件夹下
     *
     *
     *
     *
     *
     *
     * */

    @Get()
    // @SetMetadata('dec', ['user'])
    @MyDecorator(['user'])
    findAll(@MyURL() url: string) {
        // 自定义的获取路由url的装饰器成功生效
        console.log("test===:", url);// test===: /user?dec=user

        return this.userService.findAll();
    }

    @Get(':id')
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
