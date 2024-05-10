import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estado')
export class Estado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'titulo', length: 60, nullable: false })
  titulo: string;
}