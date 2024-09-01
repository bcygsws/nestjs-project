import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query('keywords') keywords: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    // 需要使用管道校验类型
    console.log(typeof page, typeof pageSize); // string string
    return this.userService.findAll(keywords, page, pageSize);
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
  addTags(@Body() bodyInfo: { tags: string[]; userId: number }) {
    console.log(bodyInfo);
    return this.userService.addTags(bodyInfo);
  }

  @Delete('/tags/:userId/:tagId')
  delTag(@Param('userId') userId: number, @Param('tagId') tagId: number) {
    console.log(userId, tagId);
    return this.userService.delTag(userId, tagId);
  }
}
