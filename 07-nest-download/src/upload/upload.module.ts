import {Module} from '@nestjs/common';
import {UploadService} from './upload.service';
import {UploadController} from './upload.controller';
import {MulterModule} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {join, extname} from 'path';

@Module({
    imports: [MulterModule.register({// 注册并配置multer模块
        storage: diskStorage({
            // destination：存放在dist下,和upload同级的images文件夹
            destination: join(__dirname, '../images'),
            // 上传后，重新构成的文件名
            filename(req, file, cb) {
                console.log(file);
                const filename = `${Date.now() + extname(file.originalname)}`;
                return cb(null, filename);
            }
        })
    })],
    controllers: [UploadController],
    providers: [UploadService],
})
export class UploadModule {
}
