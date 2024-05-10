import { Module } from '@nestjs/common';
import { EstadosController } from '../controllers/estado.controller';
import { EstadoService } from '../services/estado.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from '../entities/estado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  controllers: [EstadosController],
  providers: [EstadoService],
})
export class EstadoModule {}