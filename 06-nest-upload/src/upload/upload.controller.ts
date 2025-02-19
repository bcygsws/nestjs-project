import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    NestInterceptor,
    Type, UploadedFile
} from '@nestjs/common';
import {UploadService} from './upload.service';
import {CreateUploadDto} from './dto/create-upload.dto';
import {UpdateUploadDto} from './dto/update-upload.dto';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {
    }

    // 使用局部的请求拦截器@UseInterceptors(),单个文件使用FileInterceptor()
    // 使用UploadFiles()装饰器接收file
    /**
     * @desc：使用apifox测试
     * http://localhost:3000/upload
     *
     * */
    @Post()
    @UseInterceptors(FileInterceptor('file') as NestInterceptor | Function)
    create(@UploadedFile() file) {
        console.log(file);
        return true;
    }

    @Get()
    findAll() {
        return this.uploadService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.uploadService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
        return this.uploadService.update(+id, updateUploadDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.uploadService.remove(+id);
    }
}
