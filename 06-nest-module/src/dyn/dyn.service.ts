import { Injectable } from '@nestjs/common';
import { CreateDynDto } from './dto/create-dyn.dto';
import { UpdateDynDto } from './dto/update-dyn.dto';

@Injectable()
export class DynService {
  create(createDynDto: CreateDynDto) {
    return 'This action adds a new dyn';
  }

  findAll() {
    return `This action returns all dyn`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dyn`;
  }

  update(id: number, updateDynDto: UpdateDynDto) {
    return `This action updates a #${id} dyn`;
  }

  remove(id: number) {
    return `This action removes a #${id} dyn`;
  }
}
