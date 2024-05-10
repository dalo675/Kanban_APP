import { Module } from '@nestjs/common';
import { TareaController } from '../controllers/tarea.controller';
import { TareaService } from '../services/tarea.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from '../entities/tarea.entity';
import { Estado } from '../entities/estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea, Estado])],
  controllers: [TareaController],
  providers: [TareaService],
})
export class TareaModule {}
