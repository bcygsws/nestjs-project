import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

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
