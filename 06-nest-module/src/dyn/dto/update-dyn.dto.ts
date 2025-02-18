import { PartialType } from '@nestjs/mapped-types';
import { CreateDynDto } from './create-dyn.dto';

export class UpdateDynDto extends PartialType(CreateDynDto) {}
