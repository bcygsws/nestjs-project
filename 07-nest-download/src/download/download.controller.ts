import {Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import {DownloadService} from './download.service';
import {CreateDownloadDto} from './dto/create-download.dto';
import {UpdateDownloadDto} from './dto/update-download.dto';
import {join} from "path";
// 注：Response包括Request都是来自express的接口名称，而不是nestjs自带的
import {Response} from "express";
import {zip} from 'compressing';

@Controller('download')
export class DownloadController {
    constructor(private readonly downloadService: DownloadService) {
    }

    @Post()
    create(@Body() createDownloadDto: CreateDownloadDto) {
        return this.downloadService.create(createDownloadDto);
    }

    /**
     * @desc:传统方式下载图片
     *
     *
     *
     * */
    @Get('img')
    getImage(@Res() res: Response) {
        // 上传的图片路径名从images文件夹下查找
        const url = join(__dirname, '../images/1740123265156.jpg');
        res.download(url);
    }

    /**
     * @desc:在不明确文件类型或者文件内容时，以二进制流的方式下载
     * 1.安装compressing扩展库
     * npm i compressing --save
     *
     * 2.引入zip,压缩供下载的文件
     * import {zip} from 'compressing';
     * const tarStream = new zip.Stream();
     * await tarStream.addEntry(url);
     * 3.设置响应头
     * res.setHeader('Content-Type', 'application/octet-stream');
     * res.setHeader('Content-Disposition', `attachment;filename=bcy`);
     *
     * 注：Content-Disposition是http协议的响应头一个字段，用于处理如何处理响应的内容以及
     * 如何呈现给用户
     * inline: 在浏览器中直接打开文件
     * attachment: 作为附件下载
     *
     *
     *
     * */
    @Get('stream')
    async getStream(@Res() res: Response) {
        const url = join(__dirname, '../images/1740123265156.jpg');
        const tarStream = new zip.Stream();
        // 压缩文件，是一个异步操作，需要等待
        await tarStream.addEntry(url);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=bcy`);
        // 压缩后的文件流，通过管道返回res
        tarStream.pipe(res);

    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.downloadService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDownloadDto: UpdateDownloadDto) {
        return this.downloadService.update(+id, updateDownloadDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.downloadService.remove(+id);
    }
}
