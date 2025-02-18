import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {SwaggerService} from './swagger.service';
import {CreateSwaggerDto} from './dto/create-swagger.dto';
import {UpdateSwaggerDto} from './dto/update-swagger.dto';
import {
    ApiTags,
    ApiOperation,
    ApiBody,
    ApiQuery,
    ApiResponse,
    ApiParam,
    ApiBearerAuth
} from '@nestjs/swagger';

/**
 * ApiTags帮助文档中的接口，以tags值归类
 *
 *
 *
 *
 *
 * */


// ApiTags帮助文档中的接口，以tags值归类
@ApiTags('swagger模块接口')
@ApiBearerAuth()
@Controller('swagger')
export class SwaggerController {
    constructor(private readonly swaggerService: SwaggerService) {
    }

    @Post()
    @ApiOperation({summary: 'post接口', description: 'swagger模块'})// 概括介绍和详细描述
    // @ApiBody({description: '当前页码', required: true})
    create(@Body() createSwaggerDto: CreateSwaggerDto) {
        return this.swaggerService.create(createSwaggerDto);
    }

    @Get()
    @ApiOperation({summary: 'get接口', description: 'swagger模块'})// 概括介绍和详细描述
    @ApiQuery({name: 'id', description: '查询参数id'})
    findAll() {
        return this.swaggerService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'get接口，根据路径id请求', description: 'swagger模块'})// 概括介绍和详细描述
    @ApiParam({name: 'id', required: true, description: '必传参数'})
    @ApiResponse({status: 200, description: '小黑子，请求成功了'})
    findOne(@Param('id') id: string) {
        return this.swaggerService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSwaggerDto: UpdateSwaggerDto) {
        return this.swaggerService.update(+id, updateSwaggerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.swaggerService.remove(+id);
    }
}
