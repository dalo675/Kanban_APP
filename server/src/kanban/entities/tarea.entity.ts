import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Estado } from './estado.entity';

@Entity('tarea')
export class Tarea {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'titulo', length: 60, nullable: false })
    titulo: string;

    @Column({ name: 'prioridad', nullable: false, enum:['Baja','Media','Alta']})
    prioridad: string; 

    @Column({ name: 'id_estado', nullable: false })
    id_estado: string;
    
    @ManyToOne(() => Estado, estado => estado.id, { nullable: false })
    @JoinColumn({ name: 'id_estado' })
    estado: Estado;
}