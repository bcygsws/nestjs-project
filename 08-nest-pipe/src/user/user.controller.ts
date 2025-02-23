import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserPipe} from "./user.pipe";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }
    /**
     * @desc：管道的使用
     * 管道转换
     * 管道自定义校验
     *
     * */

    @Post()
    // 方式一：自定义校验管道UserPipe
    create(@Body(UserPipe) createUserDto: CreateUserDto) {
    // 方式二、使用内置管道ParseIntPipe
    // create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        console.log("createUserDto: ", createUserDto);
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }
    /**
     * @desc：使用管道转换API,8个
     * http://localhost:3000/user/123
     * id路径参数，就由默认的string变成了number
     *
     * */

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log("id=====", id);
        // 使用内置管道转换API前
        // console.log('typeof id', typeof id);// typeof id string
        console.log('typeof id', typeof id);// typeof id number
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
/**
 * @desc:一、记录使用管道自定义校验的过程
 * 1.将管道类，放在@Body()等参数装饰器中，就可以使用管道了
 * 2.DTO类，例如：CreateUserDto可以定义参数类型
 *
 * 3.一些更高级的校验，还要安装第三方库实现
 * class-validator class-transformer
 * npm i class-validator class-transformer --save
 * 4.在dto类中，添加@IsString()等装饰器,
 * 5.在管道中，使用plainToInstance方法，将传入的参数，转换为实例对象
 * const dto = plainToInstance(metadata.metatype!, value);
 * 6.使用validate方法，对实例对象进行校验,这是一个异步过程，使用await，拿到可能得错误信息
 * const err=await validate(dto);
 *
 * 7.如果错误信息err有值，就抛出异常，提示错误信息
 * throw new HttpException(err,HttpStatus.BAD_REQUEST);
 *
 * 8.全局的UserFilter就会捕获到这个异常
 *
 * @desc:对于上述自定义校验，pipe官方有一个API
 * ValidationPipe
 * 1.在@Body()中，使用ValidationPipe
 * 2.在main.ts中，使用app.useGlobalPipes(new ValidationPipe());
 * 也可以实现上面自定义管道相同的效果
 *
 *
 *
 *
 * */