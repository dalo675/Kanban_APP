import { IsNotEmpty } from 'class-validator';

export class UpdateEstadoDto {
  @IsNotEmpty({ message: 'El campo de título no puede ir vacío' })
  titulo: string;
}