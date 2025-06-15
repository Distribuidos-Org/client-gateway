import { Controller, Delete, Get, Inject, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ALUMNOS_SERVICE } from 'src/config/services';

@Controller('alumnos')
export class AlumnosController {
  constructor(
    @Inject(ALUMNOS_SERVICE) private readonly alumnosClient: ClientProxy,
  ) {}

  @Post()
  createAlumno() {
    return { message: 'Alumno created successfully' };
  }

  @Get()
  getAlumnos() {
    return this.alumnosClient.send({ cmd: 'find_all_alumnos' }, {});
  }

  @Get(':id')
  getAlumnoById() {
    return { id: 1, name: 'John Doe' };
  }

  @Patch(':id')
  updateAlumno() {
    return { message: 'Alumno updated successfully' };
  }

  @Delete(':id')
  deleteAlumno() {
    return { message: 'Alumno deleted successfully' };
  }

  @Post('seed')
  seedAlumnos() {
    return this.alumnosClient.send({ cmd: 'seed_alumnos' }, {});
  }
}
