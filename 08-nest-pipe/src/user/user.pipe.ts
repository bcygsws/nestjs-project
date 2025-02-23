import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from '@nestjs/common';
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";

@Injectable()
export class UserPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        console.log("value: ", value);// {name: '张三', age: 18}
        // 1.metatype是Dto类名；type是body参数，data是@Body('name',mUserPipe)；不传第一个参数， 就是undefined
        console.log("metadata: ", metadata);// metadata:{metatype: [class CreateUserDto],type: 'body', data: undefined}
        // 2.通过plainToInstance方法，把value值，反射到Dto类上面了
        const dto = plainToInstance(metadata.metatype!, value);// dto:  CreateUserDto { name: '张三', age: '18' }
        console.log("dto: ", dto);
        // 3.返回的的是错误，而且是promise;使用async/await,拿到值
        const err = await validate(dto);
        console.log("err: ", err);
        const errArray: string[] = [];
        if (err.length) {// 走这个分支了，有错误
            err.map((item) => {
                console.log(Object.values(item.constraints as Object));
                errArray.push(Object.values(item.constraints as Object)[0]);
            })
            console.log("errArray: ", errArray);
            // 异常过滤器user.filter.ts就会捕获这个异常
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
        return value;//
    }
}
