import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from '@nestjs/common';
// 实例化DTO类的 plainToInstance
import {plainToInstance} from 'class-transformer';
import {validate} from "class-validator";

@Injectable()
export class LoginPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        // console.log(value);
        // console.log(metadata);
        // console.log(metadata.metatype);// 拿到DTO类名
        // 这样就可以把参数值，反射到DTO类上面了
        const DTO = plainToInstance(metadata.metatype, value);
        // console.log(DTO);
        // 得到验证结果对象
        const errors = await validate(DTO);
        console.log(errors);
        // 验证通过，errors是一个空数组[];不是空数组就是有错误；if分支判断
        if (errors.length) {// 走这个分支了，有错误
            throw new HttpException(errors, HttpStatus.BAD_REQUEST);// 400
        }

        return value;
    }
}
