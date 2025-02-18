import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserService2} from "./user.service2";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
                @Inject('XiaoMan') private readonly userService2: UserService2,
                @Inject('JD') private readonly nickname: string[],
                @Inject('FACTORY') private readonly val: number,// 工厂中返回的是number数字
                @Inject('ASYNC') private readonly async: string
    ) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    // 访问http://localhost:3000/user
    @Get()
    findAll() {
        // 1.正常访问，providers:[UserService]
        // return this.userService.findAll();

        // 2.起别名的方式：providers:[{provide:'XiaoMan',useClass:UserService2}
        // return this.userService2.findAll();
        // 3.起别名的方式：providers:[{provide:'JD',useValue:['张三','李四','王五']}
        // return this.nickname;// ["张三","李四","王五"]

        // 4.工厂模式
        /**
         * {
         *             provide: 'FACTORY',
         *             inject: [UserService3],// 工厂中要注入service类，此处不再用providers，而是inject注入
         *             useFactory: (userService3: UserService3) => {
         *                 console.log(userService3.findAll());
         *                 return 123;
         *             }
         *         }
         *
         *
         * */
        // return this.val;
        /**
         * 5.异步模式
         * {
         *             provide: 'ASYNC',
         *             useFactory: async () => {
         *                 return await new Promise((resolve) => {
         *                     setTimeout(() => {
         *                         resolve("异步模式");
         *                     }, 3000)
         *                 })
         *             }
         *         }
         *
         *
         * */
        return this.async;


    }

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
