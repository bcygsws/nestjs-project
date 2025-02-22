import {Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe} from '@nestjs/common';
import {ListService} from './list.service';
import {CreateListDto} from './dto/create-list.dto';
import {UpdateListDto} from './dto/update-list.dto';
// 引人uuid库
import {v4 as uuidv4} from 'uuid';

console.log(uuidv4());

@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) {
    }

    @Post()
    create(@Body() createListDto: CreateListDto) {
        return this.listService.create(createListDto);
    }

    @Get()
    findAll() {
        return this.listService.findAll();
    }

    /**
     * @desc:实现id参数是uuid
     * 1.如果为id路径参数，配置了ParseUUIDPipe管道
     * 发送get请求，http://localhost:3000/list/123
     * 响应结果是：{"message":"Validation failed (uuid is expected)","error":"Bad Request","statusCode":400}
     *
     * 2.终端中会打印一个uuid字符串
     * 例如：b4e74bec-cfbb-4600-9f8c-3229d78f4cdd
     * 再次发送get请求，http://localhost:3000/list/b4e74bec-cfbb-4600-9f8c-3229d78f4cdd
     * 响应结果是：{"data":"This action returns a #NaN list","code":200,"msg":"success"}
     *
     *
     * */
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        console.log('id =====', id);
        return this.listService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
        return this.listService.update(+id, updateListDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.listService.remove(+id);
    }
}
