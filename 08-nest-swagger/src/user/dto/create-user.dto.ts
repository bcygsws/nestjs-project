import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'bcy', description: '用户名'})
    name: string;

    @ApiProperty({example: 18, description: '年龄'})
    age: number;
}
