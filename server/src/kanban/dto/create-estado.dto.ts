import { IsNotEmpty } from 'class-validator';

export class CreateEstadoDto {
  @IsNotEmpty({ message: 'El campo de título no puede ir vacío' })
  titulo: string;
}