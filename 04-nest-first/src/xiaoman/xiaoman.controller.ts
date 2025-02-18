import {Controller, Get, Post, Body, Patch, Param, Delete, Version, HttpCode, Headers} from '@nestjs/common';
import {XiaomanService} from './xiaoman.service';
import {CreateXiaomanDto} from './dto/create-xiaoman.dto';
import {UpdateXiaomanDto} from './dto/update-xiaoman.dto';

@Controller('xiaoman')
// a.统一使用版本控制
// @Controller({ path: 'xiaoman', version: '1' })
// get请求地址需要加上版本号v1：http://localhost:3000/v1/xiaoman
export class XiaomanController {
    constructor(private readonly xiaomanService: XiaomanService) {
    }

    @Post()
    create(@Body() createXiaomanDto: CreateXiaomanDto) {
        return this.xiaomanService.create(createXiaomanDto);
    }

    @Get()
    findAll() {
        return this.xiaomanService.findAll();
    }

// b.单个请求实现版本控制
// 只有注解下，这个根据id查找请求，需要带上版本号
//   @Version('1')

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.xiaomanService.findOne(+id);
//   }

    // 获取前端传递过来的数据的几个装饰器：@Headers() @HttpCode(500) @Param()
    @Get(':id')
    @HttpCode(500)// 使用@HttpCode(500)调试工具，例如apifox，检验响应 控制接口返回的状态码就修改成 500了，默认是200
    findOne(@Headers() headers, @Param('id') id: string) {
        console.log("headers===", headers);
        console.log("id===", id);
        return {
            message: 'OK'
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateXiaomanDto: UpdateXiaomanDto) {
        return this.xiaomanService.update(+id, updateXiaomanDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.xiaomanService.remove(+id);
    }
}
