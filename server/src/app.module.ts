import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from './kanban/entities/estado.entity';
import { EstadoModule } from './kanban/modules/estado.module';
import { Tarea } from './kanban/entities/tarea.entity';
import { TareaModule } from './kanban/modules/tarea.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'user',
      password: 'user',
      database: 'db_kanban',
      options: {
        encrypt: false,
      },
      //esto es para sincronizar la base de datos en tiempo real, puede sobreescribir la BD
      synchronize: true,
      entities: [Estado, Tarea],
    }),
    EstadoModule, TareaModule
  ],
})
export class AppModule {}