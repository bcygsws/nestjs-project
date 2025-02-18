import { PartialType } from '@nestjs/mapped-types';
import { CreateXiaomanDto } from './create-xiaoman.dto';

export class UpdateXiaomanDto extends PartialType(CreateXiaomanDto) {}
