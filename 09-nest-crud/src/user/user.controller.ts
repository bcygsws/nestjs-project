import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query, ParseIntPipe,
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {AddUserDto} from "./dto/add-user.dto";
import {AddTagDto} from "./dto/add-tag.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(@Query() query: AddUserDto) {
        return this.userService.findAll(query);
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

    @Post('/tags')
    addTags(@Body() bodyInfo: AddTagDto) {
        console.log(bodyInfo);
        return this.userService.addTags(bodyInfo);
    }
    /**
     * @desc:在表中，删除Tags列的一个标签
     * 参数：
     * userId:当前行id
     * tagId: 当前标签id
     * 请求方式：delete
     * 请求地址：/user/tags/:userId/:tagId
     *
     *
     * */

    @Delete('/tags/:userId/:tagId')
    delTag(@Param('userId',ParseIntPipe) userId: number, @Param('tagId',ParseIntPipe) tagId: number) {
        console.log(userId, tagId);
        return this.userService.delTag(userId, tagId);
    }
}

// abc