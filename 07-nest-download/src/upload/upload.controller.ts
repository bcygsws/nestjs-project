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
    UploadedFile
} from '@nestjs/common';
import {UploadService} from './upload.service';
import {CreateUploadDto} from './dto/create-upload.dto';
import {UpdateUploadDto} from './dto/update-upload.dto';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {
    }

    /**
     * @desc:上传文件路由
     *
     * */
    @Post()
    @UseInterceptors(FileInterceptor('file') as NestInterceptor | Function)
    create(@UploadedFile() file) {
        console.log("file====", file);
        return {
            msg: "上传成功"
        }
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
