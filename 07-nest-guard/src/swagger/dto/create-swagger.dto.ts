import {ApiProperty} from "@nestjs/swagger";

export class CreateSwaggerDto {
    @ApiProperty({example: '小满'})
    name: string;
    @ApiProperty({example: 18})
    age: number;
}
