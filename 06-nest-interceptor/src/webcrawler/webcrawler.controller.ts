import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebcrawlerService } from './webcrawler.service';
import { CreateWebcrawlerDto } from './dto/create-webcrawler.dto';
import { UpdateWebcrawlerDto } from './dto/update-webcrawler.dto';
import axios from "axios";
/**
 * @爬虫技术
 * web crawler
 * 定义：按照一定规则抓取 万维网 的一些程序或者脚本
 * 参考文档：https://xiaoman.blog.csdn.net/article/details/127158497
 *
 * 1.安装包axios 和 cheerio
 *
 *
 *
 *
 *
 *
 *
 * */

@Controller('webcrawler')
export class WebcrawlerController {
  constructor(private readonly webcrawlerService: WebcrawlerService) {}

  @Post()
  create(@Body() createWebcrawlerDto: CreateWebcrawlerDto) {
    return this.webcrawlerService.create(createWebcrawlerDto);
  }

  @Get('spider')
  async findAll() {

    return this.webcrawlerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webcrawlerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebcrawlerDto: UpdateWebcrawlerDto) {
    return this.webcrawlerService.update(+id, updateWebcrawlerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webcrawlerService.remove(+id);
  }
}
