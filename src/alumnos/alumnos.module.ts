import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AlumnosController } from './alumnos.controller';
import { ALUMNOS_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [AlumnosController],
  imports: [
    ClientsModule.register([
      {
        name: ALUMNOS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.alumnosServiceHost,
          port: envs.alumnosServicePort,
        },
      },
    ]),
  ],
  providers: [],
})
export class AlumnosModule {}
