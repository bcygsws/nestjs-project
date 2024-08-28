import { PartialType } from '@nestjs/mapped-types';
import { CreateSwaggerDto } from './create-swagger.dto';

export class UpdateSwaggerDto extends PartialType(CreateSwaggerDto) {}
