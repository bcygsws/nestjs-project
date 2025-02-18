import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    Res,
    Req, UploadedFiles
} from '@nestjs/common';
import {UploadService} from './upload.service';
import {CreateUploadDto} from './dto/create-upload.dto';
import {UpdateUploadDto} from './dto/update-upload.dto';
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {join} from "path";
import {zip} from "compressing";

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {
    }

    /**
     * @处理返回给前端的逻辑
     * file对象
     * {
     *   fieldname: 'file',
     *   originalname: 'GVHbjquWkAAm66A.jpg',
     *   encoding: '7bit',
     *   mimetype: 'image/jpeg',   // 值有可能是audio和video,分别代码音频、视频
     *   destination: 'E:\\nestjs-project\\04_nestjs_pro\\dist\\images',
     *   filename: '1724512169000.jpg',
     *   path: 'E:\\nestjs-project\\04_nestjs_pro\\dist\\images\\1724512169000.jpg',
     *   size: 253073
     * }
     *
     * 请求方式：post
     * 请求参数：参数类型：body -form-data 参数名：file,就是FileInterceptor('file') 中的file
     *
     *
     *
     * */

    // @Post('album')
    // @UseInterceptors(FileInterceptor('file')) // file字段名就是apifox中body参数，form-data参数名称
    // upload(@UploadedFile() file, @Req() req, @Res() res) {
    //     console.log(req);
    //     // 如果需要拼接成完成路径，需要域名localhost:3000
    //     console.log(req.headers.host);
    //     console.log("test", file);
    //     const imgList: string[] = [];
    //     if (file) {
    //         let url = "http://" + req.headers.host + "/bcy/" + file.filename;
    //         imgList.unshift(url);
    //         // 根据file的数据结构，拼接一个返回给前端的对象
    //         res.send({
    //             code: 200,
    //             message: '返回图片链接',
    //             data: {
    //                 url: imgList[0],
    //                 file_name: file.filename
    //             }
    //         })
    //     } else {
    //         res.send({
    //             code: 500,
    //             message: '上传失败'
    //         });
    //     }
    //
    // }

    /**
     * @name:upload方法
     * @description: 一次上传多个文件
     * a.FileInterceptor 变成 FilesInterceptor
     * b.装饰器也变成@UploadFiles()
     * 参考文档：https://blog.csdn.net/qq_62835094/article/details/135675329
     *
     * */
    @Post('album')
    // 文件拦截器，将提交的多张图片，存放在本地了
    @UseInterceptors(FilesInterceptor('files'))
    upload(@UploadedFiles() files) {
        console.log(files);
        // 返回格式如：[{name:'',url:''},]的对象数组
        const DOMAIN = 'http://localhost:3000/bcy/';
        const imageArray = files.map(item => ({
            name: item.originalname,
            url: `${DOMAIN}${item.filename}`
        }))


        return imageArray;
    }


    /**
     * @文件的下载
     * 有上传，就有下载
     * 文件下载有两种处理方式：
     * 1.使用res.download()方法，简单；但是不安全
     * 请求方式：GET
     * 接口地址：http://localhost:3000/upload/export
     *
     * 2.使用流的方式，较为复杂，但更可控，更安全
     * 请求方式:GET
     * 接口地址：http://localhost:3000/upload/stream
     *
     * 步骤：
     * 2.1 安装包compressing
     * npm i compressing -D
     *
     * 2.2 该包将图片压缩成一个zip
     * 引入时，
     * import {zip} from 'compressing';
     *
     *
     * 前端接收时，如果是流文件
     * fetch第一个then的结果是，res.arrayBuffer()
     *
     *
     *
     *
     * */
    @Get('export')
    download(@Res() res) {
        // 1.提供一个上传后，存储到本地的文件路径
        const file_url = join(__dirname, '../1724542070166.jpg');
        // 2.res执行下载文件操作
        res.download(file_url);

    }

    @Get('stream')
    async streamDownload(@Res() res) {
        // 1.实例化流对象
        const tarStream = new zip.Stream();
        // 2.添加下载文件路径，addEntry。这是个异步操作
        const file_url = join(__dirname, '../images/1724542070166.jpg');
        await tarStream.addEntry(file_url);
        // 3.设置响应头（不设置下面两处响应头，和方式一 一样，只不过生成的是stream.zip,解压后也还是 图片文件）
        // 设置响应头后，前端也需要处理，将图片读出来
        // 数据响应类型，为 标识二进制流文件
        res.setHeader('Content-Type', 'application/octet-stream');
        // 参考：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition
        // 消息体应该被下载到本地，下载后值预填为bcy
        res.setHeader('Content-Disposition', `attachment;filename=bcy`)
        // 回复的消息体会以页面的一部分或者整个页面来展示
        // res.setHeader('Content-Disposition', `inline`)
        // 4.通过管道返回res
        tarStream.pipe(res);
    }

    create(@Body() createUploadDto: CreateUploadDto) {
        return this.uploadService.create(createUploadDto);
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
