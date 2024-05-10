import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoDto } from '../dto/create-estado.dto';
import { UpdateEstadoDto } from '../dto/update-estado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from '../entities/estado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoService {

    constructor(
        @InjectRepository(Estado)
        private estadosRepository: Repository<Estado>,
    ) { }

    async fetchEstados(): Promise<Estado[]> {
        return this.estadosRepository.find();
    }

    async fetchEstadoById(id: string): Promise<Estado> {
        const found = await this.estadosRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new NotFoundException(`Estado "${id}" no encontrado`);
        }
        return found;
    }

    async addEstado(createEstadoDto: CreateEstadoDto): Promise<Estado> {
        const { titulo } = createEstadoDto;
        const estado = this.estadosRepository.create({
            titulo: titulo
        });
        await this.estadosRepository.save(estado);
        return estado;
    }

    async removeEstado(id: string) {
        const result = await this.estadosRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Estado "${id}" no encontrado`);
        }
        return { message: 'Estado borrado existosamente' };
    }

    async updateEstado(id: string, updateEstadoDto: UpdateEstadoDto) {
        const hasEstado = await this.fetchEstadoById(id);
        if (!hasEstado) throw new Error(`Estado "${id}" no encontrado`);
        await this.estadosRepository.update(id, updateEstadoDto);
    }
}