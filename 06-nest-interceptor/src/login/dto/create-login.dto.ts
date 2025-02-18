import {IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';

export class CreateLoginDto {
    // 1.定义一下body里的两个参数类型
    // 2.更高级的验证，使用两个常用库：class-tranformer和class-validator,安装后引入
    // 命令：npm i class-validator class-tranformer --save
    @IsNotEmpty()  // 非空
    @IsString()   // 字符串类型
    @Length(5, 10, {
        message: '字符长度必须在5~10个字符范围内'
    }) // 长度5到10
    name: string;
    @IsNumber()
    age: number;
}
