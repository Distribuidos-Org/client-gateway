import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AlumnosController } from './alumnos.controller';
import { NATS_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';

@Module({
  controllers: [AlumnosController],
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  providers: [],
})
export class AlumnosModule {}
