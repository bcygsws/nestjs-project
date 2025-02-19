import {Module} from '@nestjs/common';
import {UploadService} from './upload.service';
import {UploadController} from './upload.controller';
import {MulterModule} from "@nestjs/platform-express";
// 组成
import {join, extname} from 'path';
import {MulterOptions} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import {diskStorage} from "multer";

@Module({
    imports: [MulterModule.register({// 注册Multer模块
        storage: diskStorage({
            // 将图片存放目录/images调整到和upload文件夹同级；验证：打包在dist/后，/upload和/images同级
            destination: join(__dirname, '../images'),// 图片存放目录
            filename: (req, file, cb) => {// 文件名
                const filename = `${new Date().getTime() + extname(file.originalname)}`;
                return cb(null, filename);
            }
        })

    } as MulterOptions)],
    controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule {
}
