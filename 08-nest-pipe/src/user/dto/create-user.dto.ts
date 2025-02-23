import {IsNotEmpty, IsNumber, IsString, Length} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(6, 18, {message: 'name值必须至少包含6-18个字符'})
    name: string;

    @IsNumber()
    @Length(6, 18, {message: 'age值必须至少包含6-18个字符'})
    age: number;
}
