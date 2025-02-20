import {Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import {DownloadService} from './download.service';
import {CreateDownloadDto} from './dto/create-download.dto';
import {UpdateDownloadDto} from './dto/update-download.dto';
import {join} from "path";
import {Response} from "express";

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
        const url = join(__dirname, '../images/1740058575448.jpg');
        res.download(url);
    }

    @Get('img2')
    getImage2() {

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
