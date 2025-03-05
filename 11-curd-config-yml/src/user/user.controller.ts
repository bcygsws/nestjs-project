import {Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

export interface SearchParams {
    page?: number;
    pageSize?: number;
    keywords?: string;
}

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }
    /**
     * @desc:添加数据接口
     * 请求方式：POST
     * 参数：CreateUserDto
     *  url:/user
     *
     *  1.添加一行数据时，从表中，必须添加一行数据{user_id:当前生成的, id:tags的id, tags:tag标签名称}
     *  2.name标签为唯一
     *
     * */

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    /**
     * @desc:接口说明
     * 参数说明：
     * 1.前端必传的参数，且给出默认值
     * 2.参数含义
     *
     * page:当前页码
     * pageSize:每页显示条数
     * keywords:搜索关键字
     *
     * 3.请求方式 GET
     * 4.请求地址：/user?keywords=''&page=1&pageSize=10
     *
     * 注：前端即使是number类型的page或者pageSize传递过来后，不处理时默认变成了string
     * 使用内置管道
     *
     * */
    @Get()
    findAll(@Query() query: SearchParams) {
        // 若前端没传，则使用默认值
        const {keywords = '', page = 1, pageSize = 5} = query;
        console.log(typeof page, typeof pageSize);// number number
        return this.userService.findAll(keywords, page, pageSize);
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
