import {Controller, Get, Post, Body, Patch, Param, Delete, Version} from '@nestjs/common';
import { XiaomanService } from './xiaoman.service';
import { CreateXiaomanDto } from './dto/create-xiaoman.dto';
import { UpdateXiaomanDto } from './dto/update-xiaoman.dto';

@Controller('xiaoman')
// a.统一使用版本控制
// @Controller({ path: 'xiaoman', version: '1' })
// get请求地址需要加上版本号v1：http://localhost:3000/v1/xiaoman
export class XiaomanController {
  constructor(private readonly xiaomanService: XiaomanService) {}

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
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xiaomanService.findOne(+id);
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
