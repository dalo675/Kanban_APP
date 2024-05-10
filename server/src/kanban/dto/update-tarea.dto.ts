import { IsNotEmpty, IsIn } from 'class-validator';

export class UpdateTareaDto {
  @IsNotEmpty({ message: 'El campo de título no puede ir vacío' })
  titulo: string;

  @IsNotEmpty({ message: 'El campo de prioridad no puede ir vacío' })
  @IsIn(['Baja', 'Media', 'Alta'], { message: 'El campo de prioridad solo puede ser: Baja, Media, Alta' })
  prioridad: string;

  @IsNotEmpty({ message: 'El campo id_estado no puede ir vacío' })
  id_estado: string;
}
