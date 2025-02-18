import {Module} from '@nestjs/common';
import {ChartService} from './chart.service';
import {ChartController} from './chart.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Chart} from "./entities/chart.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Chart])],
    controllers: [ChartController],
    providers: [ChartService],
})
export class ChartModule {
}
