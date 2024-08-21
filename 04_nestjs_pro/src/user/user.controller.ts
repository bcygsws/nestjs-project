import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Version,
    Request,
    Query,
    Headers,
    HttpCode
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

// 版本控制
// 1.整体版本控制@Controller({path:'user',version:'1'})
// 2.单个版本控制 @Version注解
// 都要在main.ts中开启版本控制

@Controller('user')
// @Controller({
//     path: 'user',
//     version: '1'
// })
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    // 1.get请求，query参数
    // url: http://localhost:3000/user
    // 1.1 query参数：name："法外狂徒张三"
    // 可以使用@Request()装饰器取值，也可以使用自己的@Query()装饰器
    // 注意：@Param @Query和@Body里面带路由参数变量名，相当于解构，输出这个名称，就直接拿到参数了

    // @Get()
    // findUser(@Request() req) {
    //     console.log(req.query);
    //     return {
    //             code: 200
    //         }
    // }

    // 1.2 使用自带的@Query装饰器，获取路由参数
    findUser(@Query() query) {
        console.log(query);
        return {
            code: 200
        }
    }

    // @Post()
    // createUser(@Body() body) {
    //     console.log(body);
    //     return {
    //         code: 200
    //     }
    // }

    // 为@Body装饰器传参，直接拿到这个路由参数
    // @HttpCode()控制接口返回的状态码 @HttpCode(500)，因为return返回的是200，请求就会出错
    @Post()
    // @HttpCode(500)
    createUser(@Body('name') name: string, @Headers() header: string) {
        console.log(name);
        console.log(header);
        console.log(header['cookie']);
        return {
            code: 200
        }
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }


    @Get()
    findAll() {
        return this.userService.findAll();
    }

    // @Version('1')
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
