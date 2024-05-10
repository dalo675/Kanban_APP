import { Body, Controller, Delete, Get, Param, Post,Put} from '@nestjs/common';
import { EstadoService } from '../services/estado.service';
import { CreateEstadoDto } from '../dto/create-estado.dto';
import { UpdateEstadoDto } from '../dto/update-estado.dto';
import { Estado } from '../entities/estado.entity';

@Controller('estados')
export class EstadosController {
  constructor(private readonly EstadoService: EstadoService) {}

  @Get()
  getEstados() {
    return this.EstadoService.fetchEstados();
  }

  @Post()
  createEstado(@Body() CreateEstadoDto: CreateEstadoDto): Promise<Estado> {
    return this.EstadoService.addEstado(CreateEstadoDto);
  }

  @Get('/:id')
  getEstadoById(@Param('id') id: string): Promise<Estado> {
    return this.EstadoService.fetchEstadoById(id);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.EstadoService.removeEstado(id);
  }

  @Put('/:id')
  async updateEstado(@Param('id') id: string, @Body() data: UpdateEstadoDto) {
    const estado = new Estado();
    Object.assign(estado, data);
    await this.EstadoService.updateEstado(id, estado);
    return { message: 'Información de Estado actualizado exitosamente', id };
  }
}