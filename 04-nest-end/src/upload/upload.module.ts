import {Module} from '@nestjs/common';
import {UploadService} from './upload.service';
import {UploadController} from './upload.controller';
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {join, extname} from 'path';


@Module({
    // 配置后，在dist中，自动创建了images文件夹
    imports: [MulterModule.register({// 设置临时文件存储路径，并设置文件名
        storage: diskStorage({
            destination: join(__dirname, '../images'),
            filename: (req, file, callback) => {
                // file.originalname是本地上传时文件包含后缀的原名，extname(本地文件名称)获取文件后缀
                // 1.设置文件的新名称
                const file_name = `${Date.now() + extname(file.originalname)}`
                return callback(null, file_name);
            }

        })
    })],
    controllers: [UploadController],
    providers: [UploadService]
})
export class UploadModule {
}

/**
 * @上传图片步骤
 * 1.安装包 multer和@types/multer (types包一般都是为了获取代码提示)
 * 安装包 @nestjs/platform-express ，这个包，一般脚手架构建项目时，都自带了，无需再安装
 *
 * 2.使用命令行：
 *    nest g res upload
 * 生成一个CRUD资源模块
 *
 * 3.在module中，使用imports注册multer模块
 * upload.controller 打印的file
 *
 * {
 *   fieldname: 'file',
 *   originalname: 'GVHbjquWkAAm66A.jpg',
 *   encoding: '7bit',
 *   mimetype: 'image/jpeg',
 *   destination: 'E:\\nestjs-project\\04_nestjs_pro\\dist\\images',
 *   filename: '1724512169000.jpg',
 *   path: 'E:\\nestjs-project\\04_nestjs_pro\\dist\\images\\1724512169000.jpg',
 *   size: 253073
 * }
 *
 *
 * 4.在controller文件中，定义一个upload()方法
 * 方法以上使用装饰器 @UseInterceptors(FileInterceptor('file'))
 *
 * FileInterceptor('字段') 是读取单个字段
 * FilesInterceptor('字段') 是读取多个字段
 *
 * 5.在main.ts 中设置图片存储的静态目录
 * app.useStaticAssets()
 *
 *
 *
 *
 * */