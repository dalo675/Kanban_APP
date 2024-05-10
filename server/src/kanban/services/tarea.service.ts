import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTareaDto } from '../dto/create-tarea.dto';
import { UpdateTareaDto } from '../dto/update-tarea.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from '../entities/tarea.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TareaService {

    constructor(
        @InjectRepository(Tarea)
        private tareaRepository: Repository<Tarea>,
    ) { }

    async fetchTareas(): Promise<Tarea[]> {
        return this.tareaRepository.find();
    }

    async fetchTareaById(id: string): Promise<Tarea> {
        const found = await this.tareaRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new NotFoundException(`Tarea "${id}" no encontrada`);
        }
        return found;
    }

    async addTarea(createTareaDto: CreateTareaDto): Promise<Tarea> {
        const tarea = this.tareaRepository.create(createTareaDto);
        await this.tareaRepository.save(tarea);
        return tarea;
    }

    async removeTarea(id: string) {
        const result = await this.tareaRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Tarea "${id}" no encontrada`);
        }
        return { message: 'Tarea eliminada exitosamente' };
    }

    async updateTarea(id: string, updateTareaDto: UpdateTareaDto) {
        const hasTarea = await this.fetchTareaById(id);
        if (!hasTarea) throw new Error(`Tarea "${id}" no encontrada`);
        await this.tareaRepository.update(id, updateTareaDto);
    }
}
