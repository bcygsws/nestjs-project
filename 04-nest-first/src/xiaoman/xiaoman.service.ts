import { Injectable } from '@nestjs/common';
import { CreateXiaomanDto } from './dto/create-xiaoman.dto';
import { UpdateXiaomanDto } from './dto/update-xiaoman.dto';

@Injectable()
export class XiaomanService {
  create(createXiaomanDto: CreateXiaomanDto) {
    return 'This action adds a new xiaoman';
  }

  findAll() {
    return `This action returns all xiaoman`;
  }

  findOne(id: number) {
    return `This action returns a #${id} xiaoman`;
  }

  update(id: number, updateXiaomanDto: UpdateXiaomanDto) {
    return `This action updates a #${id} xiaoman`;
  }

  remove(id: number) {
    return `This action removes a #${id} xiaoman`;
  }
}
