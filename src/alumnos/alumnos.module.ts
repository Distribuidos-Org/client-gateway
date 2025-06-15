import { Module } from '@nestjs/common';
import { AlumnosController } from './alumnos.controller';

@Module({
  controllers: [AlumnosController],
  providers: [],
})
export class AlumnosModule {}
