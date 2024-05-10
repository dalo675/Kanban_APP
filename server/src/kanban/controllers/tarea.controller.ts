import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TareaService } from '../services/tarea.service';
import { CreateTareaDto } from '../dto/create-tarea.dto';
import { UpdateTareaDto } from '../dto/update-tarea.dto';
import { Tarea } from '../entities/tarea.entity';

@Controller('tareas')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Get()
  getTareas() {
    return this.tareaService.fetchTareas();
  }

  @Post()
  createTarea(@Body() createTareaDto: CreateTareaDto): Promise<Tarea> {
    return this.tareaService.addTarea(createTareaDto);
  }

  @Get('/:id')
  getTareaById(@Param('id') id: string): Promise<Tarea> {
    return this.tareaService.fetchTareaById(id);
  }

  @Delete('/:id')
  deleteTarea(@Param('id') id: string) {
    return this.tareaService.removeTarea(id);
  }

  @Put('/:id')
  async updateTarea(@Param('id') id: string, @Body() data: UpdateTareaDto) {
    await this.tareaService.updateTarea(id, data);
    return { message: 'Información de Tarea actualizado exitosamente', id };
  }
}
