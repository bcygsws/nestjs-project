import { PartialType } from '@nestjs/mapped-types';
import { CreateWebcrawlerDto } from './create-webcrawler.dto';

export class UpdateWebcrawlerDto extends PartialType(CreateWebcrawlerDto) {}
